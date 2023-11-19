import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat, Message, MessageData, User } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private readonly chats_repo: Repository<Chat>,
    @InjectRepository(Message)
    private readonly messages_repo: Repository<Message>,
  ) {}

  createChat(users: User[]) {
    const chat = new Chat();
    chat.members = users;
    return chat.save();
  }

  getChat(id: number) {
    return this.chats_repo.findOne({
      where: { id },
      relations: ['members', 'messages'],
    });
  }

  addMessage(message: MessageData) {
    return this.messages_repo.create(message).save();
  }

  async getChatWithMembers(userIds: number[]) {
    return (
      await this.chats_repo
        .createQueryBuilder('chat')
        .leftJoinAndSelect('chat.members', 'member')
        .where(`member.id IN (${userIds.join(',')})`)
        .groupBy('chat.id')
        .having(`COUNT(DISTINCT member.id) = ${new Set(userIds).size}`)
        .select('chat.id')
        .getOne()
    )?.id;
  }
}
