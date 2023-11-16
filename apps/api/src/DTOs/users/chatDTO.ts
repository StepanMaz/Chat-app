import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserDTO, MessageDTO } from '.';

@ObjectType()
export class ChatDTO {
  @Field(() => ID)
  public id: number;

  @Field((type) => [UserDTO])
  public users: UserDTO[];

  @Field((type) => [MessageDTO], { nullable: true })
  public messages: MessageDTO[];

  @Field()
  public createdAt: Date;

  @Field()
  public updatedAt: Date;
}
