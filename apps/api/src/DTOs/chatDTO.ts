import { Field, ID, ObjectType } from '@nestjs/graphql';
import { NoChatsUserDTO, MessageDTO } from '.';

@ObjectType()
export class ChatDTO {
  @Field(() => ID)
  public id: number;

  @Field((type) => [NoChatsUserDTO])
  public members: NoChatsUserDTO[];

  @Field((type) => [MessageDTO], { nullable: true })
  public messages: MessageDTO[];

  @Field()
  public createdAt: Date;

  @Field()
  public updatedAt: Date;
}
