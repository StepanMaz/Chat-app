import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ChatDTO } from '.';

@ObjectType()
export class MessageDTO {
  @Field(() => ID)
  public id: number;

  @Field()
  public chatId: number;

  @Field()
  public userId: number;

  @Field({ nullable: true })
  public seenAt: Date;

  @Field()
  public content: string;

  @Field()
  public createdAt: Date;

  @Field()
  public updatedAt: Date;
}
