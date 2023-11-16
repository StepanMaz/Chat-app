import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ChatDTO, MessageDTO } from 'src/DTOs/users';
import { BaseResolver } from './base.resolver';
import { ChatsService } from 'src/services/chat.service';
import { UsersService } from 'src/services';

@Resolver((of) => ChatDTO)
export class ChatResolver {
  constructor(
    private readonly chats_service: ChatsService,
    private readonly users_service: UsersService,
  ) {}

  @Query((returns) => [ChatDTO], { name: 'chat' })
  async forUser(@Args('id', { type: () => Int }) id: number) {
    return (await this.users_service.get(id)).chats;
  }

  @Mutation((returns) => ChatDTO)
  async createChat(@Args('client_ids', { type: () => [Int] }) ids: number[]) {
    const users = await this.users_service.getFormArray(ids);
    return this.chats_service.createChat(users);
  }
}
