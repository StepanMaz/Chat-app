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

@WebSocketGateway({ namespace: 'chats' })
export class ChatGateway {
  private readonly logger = new Logger(ChatGateway.name);

  @WebSocketServer()
  server: Server<OnEvents, EmitEvents>;

  constructor(
    private readonly chats_service: ChatsService,
    private readonly userdata_service: UserDataService,
    private readonly user_service: UsersService,
  ) {}

  handleConnection(client: Socket) {
    this.logger.debug(`New game gateway connection id: ${client.id}`);

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
    client.broadcast.to(data.chat_id.toString()).emit('channelMemebersUpdate', {
      chat_id: data.chat_id,
      member_statuses: {
        [client_id]: {
          typing: true,
        },
      },
    });
  }

  @SubscribeMessage('sendMessage')
  public sendMessage(
    client: Socket<OnEvents, EmitEvents>,
    data: ClientEvents['sendMessage'],
  ) {
    this.chats_service.addMessage({
      chatId: data.chat_id,
      userId: 1,
      content: data.content,
    });

    client.broadcast.to(this.toChatId(data.chat_id)).emit('receiveMessage', {
      chat_id: data.chat_id,
      content: data.content,
    });
  }

  handleDisconnect(client: Socket) {
    this.userdata_service.setOnline(
      (client.handshake.auth as AuthData).client_id,
      false,
    );
  }

  toChatId(id: number) {
    return `chat_id:`;
  }
}
