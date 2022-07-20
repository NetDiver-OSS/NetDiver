import type { ClientOpts } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    // Core modules
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register<ClientOpts>({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: process.env.NODE_ENV !== 'production',
      playground: process.env.NODE_ENV !== 'production',
      autoSchemaFile: true,
      cors: true,
      autoTransformHttpErrors: true,
      subscriptions: {
        'graphql-ws': { path: '/graphql' },
        'subscriptions-transport-ws': true,
      },
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
    }),
  ],
})
export class AppModule {}
