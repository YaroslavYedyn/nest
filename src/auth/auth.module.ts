import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersModule, TypeOrmModule.forFeature([User])],
})
export class AuthModule {}
