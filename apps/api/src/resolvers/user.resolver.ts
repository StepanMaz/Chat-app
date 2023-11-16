import {
  Args,
  Int,
  Resolver,
  Query,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { UserDTO } from 'src/DTOs/users';
import { UsersService, UserDataService } from 'src/services';
import { BaseResolver } from './base.resolver';

@Resolver((of) => UserDTO)
export class UsersResolver extends BaseResolver(UserDTO) {
  constructor(
    private readonly user_service: UsersService,
    private readonly userdata_service: UserDataService,
  ) {
    super();
  }

  @Query((returns) => UserDTO, { name: 'user' })
  async getUser(
    @Args('id', { type: () => Int, nullable: false })
    id: number,
  ): Promise<UserDTO> {
    return await this.user_service.get(id);
  }

  @ResolveField('online')
  getOnline(@Parent() user: UserDTO): boolean {
    return this.userdata_service.isOnline(user.id);
  }

  @Mutation((returns) => UserDTO)
  async cerateUser(
    @Args('username') username: string,
    @Args('status') status: string,
    @Args('image_base64') image_base64: string,
  ) {
    const user = await this.user_service.create({
      username,
      status,
      image_base64,
    });
    return user;
  }
}
