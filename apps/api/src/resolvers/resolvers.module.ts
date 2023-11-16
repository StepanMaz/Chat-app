import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services';
import { ChatResolver } from './chat.resolver';
import { UsersResolver } from './user.resolver';

@Module({
  imports: [ServicesModule],
  exports: [ChatResolver, UsersResolver],
  providers: [ChatResolver, UsersResolver],
})
export class ResolversModule {}
