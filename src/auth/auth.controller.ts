import { Controller, Res, Post, Body, HttpStatus } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignUpDto, SignInDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  async signUp(@Res() res, @Body() singUp: SignUpDto) {
    await this.authService.signUp(singUp);

    res.status(HttpStatus.CREATED).json({
      message: 'Account created. Please, check for activate your account',
    });
  }

  @Post('SignIn')
  async SignIn(@Res() res, @Body() signIn: SignInDto) {
    const user = await this.authService.signIn(signIn);

    res.status(HttpStatus.OK).json(user);
  }
}
