import { ConfigService } from '@nestjs/config';

export const databaseConfig = (entities: any[]) => (config: ConfigService) => {
  const database = config.get('database');

  return {
    type: 'postgres',
    // synchronize: true,
    logging: true,
    ...database,
    entities,
  };
};
