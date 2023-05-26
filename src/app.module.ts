import { CacheInterceptor, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import type { RedisClientOptions } from 'redis';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';

// Modules
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';

// Services
import { AppService } from './app.service';

// Configs
import configuration from './config/configuration';
import { databaseConfig } from './config/database.config';
import { cacheConfig } from './config/cache.config';

import { User } from './users/entities';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule],
      inject: [ConfigService],
      isGlobal: true,
      useFactory: cacheConfig,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: databaseConfig([User]),
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    AppService,
  ],
  exports: [CacheModule],
})
export class AppModule {}
