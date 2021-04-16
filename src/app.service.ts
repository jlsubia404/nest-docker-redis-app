import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';

@Injectable()
export class AppService {

  constructor(private readonly redisService: RedisService){

  }

  async root(): Promise<boolean> {
    const client = this.redisService.getClient('redis-db');
    return true
  }

  async getHello(): Promise<string> {
    
    const client = this.redisService.getClient('redis-db');
    //console.dir(client);
    //client.set('name', 'jorge subia');
    
    const nameRedis = await client.get('name');

    return `Hello ${nameRedis}!`;
  }

  async putValue(): Promise<string> {

    const client = this.redisService.getClient('redis-db');
    return await client.set('name', 'jorge subia');
  }
}
