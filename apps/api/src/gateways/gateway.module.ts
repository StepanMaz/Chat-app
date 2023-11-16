import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [ServicesModule],
  providers: [ChatGateway],
  exports: [ChatGateway],
})
export class GatewayModule {}
