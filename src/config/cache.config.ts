import * as redisStore from 'cache-manager-redis-store';

import { ConfigService } from '@nestjs/config';

export const cacheConfig = (config: ConfigService) => {
  const cacheConfig = config.get('cache');

  return {
    store: redisStore as any,
    ...cacheConfig,
  };
};
