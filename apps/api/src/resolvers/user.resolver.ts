import {
  Args,
  Int,
  Resolver,
  Query,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { NoChatsUserDTO, UserDTO } from 'src/DTOs';
import { UsersService, UserDataService } from 'src/services';
import { readFileSync } from 'fs';
import { join } from 'path';

@Resolver((of) => UserDTO)
export class UsersResolver {
  constructor(
    private readonly user_service: UsersService,
    private readonly userdata_service: UserDataService,
  ) {}

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

  @Mutation((returns) => UserDTO)
  async cerateDummyUser() {
    const user = await this.user_service.create({
      username: 'Username' + Math.round(Math.random() * 10000),
      status: '',
      image_base64:
        'data:image/avif;base64, ' +
        readFileSync(join(__dirname, '../../assets/cat.avif'), {
          encoding: 'base64',
        }),
    });
    return user;
  }

  @Query((returns) => [NoChatsUserDTO])
  async findUser(
    @Args('username') username: string,
    @Args('online', { type: () => Boolean, defaultValue: false })
    online: boolean,
  ) {
    const data = this.user_service.find(username);
    if (!online) return data;
    return (await data).filter((u) => this.userdata_service.isOnline(u.id));
  }

  @Query((returns) => [NoChatsUserDTO])
  allUsers() {
    return this.user_service.getAll();
  }
}
