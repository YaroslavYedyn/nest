import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';

import { User } from './entities';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.usersRepository.save(createUserDto);
  }

  async findAll() {
    const cachedUsers = await this.cacheService.get('users');

    if (cachedUsers) {
      return cachedUsers;
    }

    const users = await this.usersRepository.find();

    await this.cacheService.set('users', users);

    return users;
  }

  async findOne(id: number) {
    const cachedUser = await this.cacheService.get(id.toString());

    if (cachedUser) {
      return cachedUser;
    }

    const user = await this.usersRepository.findOne({ where: { id: id } });

    await this.cacheService.set(id.toString(), user);

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `User with id ${id} has been updated`;
  }

  async remove(id: number) {
    await this.usersRepository.delete(id);

    return {
      messages: `User with id ${id} has been removed`,
    };
  }

  async checkExist(where: { id?: number; email?: string }): Promise<boolean> {
    return await this.usersRepository.exist({ where });
  }

}
