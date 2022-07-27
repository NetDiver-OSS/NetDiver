import type { ClientOpts } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { VlanModule } from './vlan/vlan.module';

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
    }),
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
    SentryModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (cfg: ConfigService) => ({
        dsn: cfg.get('SENTRY_DSN'),
        debug: false,
        environment:
          process.env.NODE_ENV === 'production' ? 'production' : 'dev',
        release: null,
        close: { enabled: true },
      }),
      inject: [ConfigService],
    }),
    // NetDiver modules
    VlanModule,
  ],
})
export class AppModule {}
