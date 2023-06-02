import {
  Controller,
  Res,
  Post,
  Body,
  HttpStatus,
  UseGuards, Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { SignUpDto, SignInDto } from './dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  async signUp(@Res() res, @Body() singUp: SignUpDto) {
    await this.authService.signUp(singUp);

    res.status(HttpStatus.CREATED).json({
      message: 'Account created. Please, check for activate your account',
    });
  }

  @UseGuards(AuthGuard('local'))
  @Post('signIn')
  async SignIn(@Req() req, @Res() res) {
    console.log(req.user);

    res.status(HttpStatus.OK).json(req.user);
  }
}
