import { ConfigService } from '@nestjs/config';

export const jwtConfig = (config: ConfigService): IJwtConfig => {
  console.log({
    secret: config.get('jwt_secret'),
    signOptions: { expiresIn: '60s' },
  });
  return {
    secret: config.get('jwt_secret'),
    signOptions: { expiresIn: '60s' },
  };
};

interface IJwtConfig {
  secret: string;
  signOptions: {
    expiresIn: string;
  };
}
