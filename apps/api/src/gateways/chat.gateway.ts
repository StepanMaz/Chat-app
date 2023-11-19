import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import {
  ServerEvents,
  ClientEvents,
  ToSocketIOEvents,
  AuthData,
} from 'shared/types/sockets';
import { Server, Socket } from 'socket.io';
import { UserDataService, UsersService } from 'src/services';
import { ChatsService } from 'src/services/chat.service';

type OnEvents = ToSocketIOEvents<ClientEvents>;
type EmitEvents = ToSocketIOEvents<ServerEvents>;

@WebSocketGateway()
export class ChatGateway {
  private readonly logger = new Logger(ChatGateway.name);

  @WebSocketServer()
  server: Server<OnEvents, EmitEvents>;

  constructor(
    private readonly chats_service: ChatsService,
    private readonly userdata_service: UserDataService,
    private readonly user_service: UsersService,
  ) {}

  ids = new Map();

  handleConnection(client: Socket) {
    this.logger.debug(`New connection id: ${client.id}`);
    this.ids.set((client.handshake.auth as AuthData).client_id, client.id);
    this.userdata_service.setOnline(
      (client.handshake.auth as AuthData).client_id,
    );
  }

  @SubscribeMessage('startTyping')
  public startTyping(
    client: Socket<OnEvents, EmitEvents>,
    data: ClientEvents['startTyping'],
  ) {
    const { client_id } = client.handshake.auth;

    client.to(this.toChatId(data.chat_id)).emit('chatMembersUpdate', {
      chat_id: data.chat_id,
      member_statuses: {
        [client_id]: {
          typing: true,
        },
      },
    });
  }

  @SubscribeMessage('joinChat')
  public joinChat(
    client: Socket<OnEvents, EmitEvents>,
    data: ClientEvents['joinChat'],
  ) {
    this.server.sockets.adapter.sids.get(client.id).clear();

    client.join(this.toChatId(data.chat_id));
  }

  @SubscribeMessage('inviteToChat')
  public inviteToChat(
    client: Socket<OnEvents, EmitEvents>,
    data: ClientEvents['inviteToChat'],
  ) {
    this.server.sockets.sockets
      .get(this.ids.get(data.client_id))
      .join(this.toChatId(data.chat_id));

    console.log(data);
  }

  @SubscribeMessage('sendMessage')
  public async sendMessage(
    client: Socket<OnEvents, EmitEvents>,
    data: ClientEvents['sendMessage'],
  ) {
    const message = await this.chats_service.addMessage({
      chatId: data.chat_id,
      userId: client.handshake.auth.client_id,
      content: data.content,
    });

    console.log(this.server.sockets.adapter.rooms);

    this.server.to(this.toChatId(data.chat_id)).emit('receiveMessage', message);
    console.log('sending message to chat', data.chat_id);
  }

  handleDisconnect(client: Socket) {
    this.userdata_service.setOnline(
      (client.handshake.auth as AuthData).client_id,
      false,
    );
  }

  toChatId(id: number) {
    return `chat_id:${id}`;
  }
}
