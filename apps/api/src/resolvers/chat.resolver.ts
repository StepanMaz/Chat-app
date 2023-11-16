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
    console.log(ids);
    const users = await this.users_service.getFormArray(ids);
    return this.chats_service.createChat(users);
  }
}
