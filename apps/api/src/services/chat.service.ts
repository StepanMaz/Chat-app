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
    return this.chats_repo.findOne({ where: { id } });
  }

  addMessage(message: MessageData) {
    return this.messages_repo.create(message).save();
  }
}
