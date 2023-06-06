import { CacheInterceptor, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import type { RedisClientOptions } from 'redis';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';
import { PassportModule } from '@nestjs/passport';

// this need for monitoring
// eslint-disable-next-line
import spmAgent from 'spm-agent-nodejs';

console.log(spmAgent);

// Modules
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

// Services
import { AppService } from './app.service';

// Configs
import configuration from './config/configuration';
import { databaseConfig } from './config/database.config';
import { cacheConfig } from './config/cache.config';

import { User } from './users/entities';
import { Session } from './auth/entities';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule],
      inject: [ConfigService],
      isGlobal: true,
      useFactory: cacheConfig,
    }),
    PassportModule.register({ session: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: databaseConfig([User, Session]),
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    AppService,
    // UsersService,
  ],
  exports: [CacheModule],
})
export class AppModule {}
