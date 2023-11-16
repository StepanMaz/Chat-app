import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ChatDTO } from '.';

@ObjectType()
export class UserDTO {
  @Field((type) => [ChatDTO], { nullable: true })
  public chats: ChatDTO[];

  @Field(() => ID)
  public id: number;

  @Field()
  public username: string;

  @Field({ nullable: true })
  public status?: string;

  @Field()
  public image_base64: string;

  @Field()
  public createdAt: Date;

  @Field()
  public updatedAt: Date;
}
