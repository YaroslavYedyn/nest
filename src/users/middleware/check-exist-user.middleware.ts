import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';

@Injectable()
export class CheckExistUserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const {
      params: { id },
    } = req;

    const exist = await this.userService.checkExist(+id);

    if (!exist) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: `User with id ${id} not exist`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    next();
  }
}
