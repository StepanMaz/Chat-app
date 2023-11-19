import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ChatDTO } from 'src/DTOs';
import { ChatsService } from 'src/services/chat.service';
import { UsersService } from 'src/services';

@Resolver((of) => ChatDTO)
export class ChatResolver {
  constructor(
    private readonly chats_service: ChatsService,
    private readonly users_service: UsersService,
  ) {}

  @Mutation((returns) => ChatDTO)
  async createChat(@Args('client_ids', { type: () => [Int] }) ids: number[]) {
    return this.createChatForUser(ids);
  }

  @Query((returns) => ChatDTO)
  async chat(@Args('id', { type: () => Int }) id: number) {
    return this.chats_service.getChat(id);
  }

  @Mutation((returns) => ChatDTO)
  async findChatWihtUserOrCreate(
    @Args('client_id1', { type: () => Int }) id1: number,
    @Args('client_id2', { type: () => Int }) id2: number,
  ) {
    const id = await this.chats_service.getChatWithMembers([id1, id2]);
    if (id) {
      return this.chats_service.getChat(id);
    }
    return this.createChatForUser([id1, id2]);
  }

  private async createChatForUser(ids: number[]) {
    const users = await this.users_service.getFormArray(ids);

    return this.chats_service.createChat(users);
  }
}
