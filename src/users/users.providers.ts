import { DataSource } from 'typeorm';

import { providesConstants } from '../constants';
import { User } from './entities';

export const usersProviders = [
  {
    provide: providesConstants.USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [providesConstants.DATABASE_PROVIDER],
  },
];
