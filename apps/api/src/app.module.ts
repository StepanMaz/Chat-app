import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ResolversModule } from './resolvers/resolvers.module';

import * as dotenv from 'dotenv';
import { GatewayModule } from './gateways/gateway.module';
dotenv.config();

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: 'schema.graphql',
      driver: ApolloDriver,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number.parseInt(process.env.POSTGERS_PORT),
      username: process.env.POSTGRES_USER,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
      password: process.env.POSTGRES_PASSWORD,
    }),
    ResolversModule,
    GatewayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
