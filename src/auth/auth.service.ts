import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { Repository } from 'typeorm';

import { SignUpDto, SignInDto } from './dto';
import { authConstants } from '../constants';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities';
import { TokenInterface } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { password, email } = signUpDto;

    const userExist = await this.userService.checkExist({ email });

    if (userExist) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: `User with ${email} email already exist`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPass = await bcrypt.hash(password, authConstants.PASS_SALT);

    const activation_key = randomBytes(255 / 2).toString('hex');

    return await this.userService.create({
      ...signUpDto,
      isActive: false,
      activation_key,
      password: hashPass,
    });
  }

  async validateUser({ login, password }: SignInDto) {
    const user = await this.usersRepository.findOne({
      where: { email: login },
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'Invalid authorization data',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'Invalid authorization data',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (!user.isActive) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: 'User not active',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }

  login(user: User): TokenInterface {
    const payload = { username: user.email, sub: user.id };

    console.log(payload);
    return {
      access_token: 'ds',
    };
  }
}
