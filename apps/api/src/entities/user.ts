import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Chat } from './chat';
import { Message } from './message';

@Entity({
  name: 'users',
})
export class User extends BaseEntity implements UserData {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public username: string;

  @Column({ length: 200, nullable: true })
  public status?: string;

  @Column()
  public image_base64: string;

  @OneToMany(() => Message, (message) => message.user)
  public messages: Message[];

  @ManyToMany(() => Chat, (chat) => chat.users)
  @JoinTable()
  public chats: Chat[];

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

export interface UserData {
  username: string;
  status?: string;
  image_base64: string;
}
