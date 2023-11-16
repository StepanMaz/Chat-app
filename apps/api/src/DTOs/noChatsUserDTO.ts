import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class NoChatsUserDTO {
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
