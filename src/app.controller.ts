import {
  Controller,
  Get,
  CacheKey,
  CacheTTL,
  UseInterceptors,
  CacheInterceptor,
} from '@nestjs/common';
import { AppService } from './app.service';

@UseInterceptors(CacheInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @CacheKey('some_route')
  @CacheTTL(10)
  getHello() {
    return this.appService.getHello();
  }
}
