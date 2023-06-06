import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategies';
import { User } from '../users/entities';
import { SessionSerializer } from './session.serializer';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer],
  imports: [UsersModule, PassportModule, TypeOrmModule.forFeature([User])],
})
export class AuthModule {}
