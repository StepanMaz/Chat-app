import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserDataService } from './userdata.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message, User, Chat } from 'src/entities';
import { ChatsService } from './chat.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Message, Chat])],
  exports: [UsersService, UserDataService, ChatsService],
  providers: [UsersService, UserDataService, ChatsService],
})
export class ServicesModule {}
