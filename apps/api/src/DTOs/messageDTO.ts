import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ChatDTO } from '.';

@ObjectType()
export class MessageDTO {
  @Field(() => ID)
  public id: number;

  @Field((type) => ChatDTO)
  public chat: ChatDTO;

  @Field({ nullable: true })
  public seenAt: Date;

  @Field()
  public createdAt: Date;

  @Field()
  public updatedAt: Date;
}
