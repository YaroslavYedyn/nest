import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Match } from '../../decorator/match.decorator';

export class SignUpDto {
  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  @Match('password', {
    message: 'PasswordConfirmation must match with password',
  })
  passwordConfirmation: string;
}
