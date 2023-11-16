import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

import { User } from './user';
import { Message } from './message';

@Entity({
  name: 'chats',
})
export class Chat extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToMany(() => User, (user) => user.chats)
  @JoinTable()
  public users: User[];

  @OneToMany(() => Message, (message) => message.chat)
  public messages: Message[];

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
