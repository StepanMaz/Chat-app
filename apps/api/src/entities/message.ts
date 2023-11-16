import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  ManyToOne,
  Column,
  OneToMany,
} from 'typeorm';

import { Chat } from './chat';
import { User } from './user';

@Entity({
  name: 'messages',
})
export class Message extends BaseEntity implements MessageData {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  @JoinTable()
  public chat: Chat;

  @Column()
  public chatId: number;

  @ManyToOne(() => User, (user) => user.messages)
  public user: User;

  @Column()
  public userId: number;

  @Column({ length: 1000 })
  public content: string;

  @Column({ nullable: true })
  public seenAt: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;
}

export interface MessageData {
  userId: number;
  chatId: number;
  content: string;
}
