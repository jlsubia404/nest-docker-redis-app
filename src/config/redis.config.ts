import {registerAs} from '@nestjs/config';

export default registerAs('redisConf', () => ({
    redisUrl: process.env.REDIS_URL,
    
  }));