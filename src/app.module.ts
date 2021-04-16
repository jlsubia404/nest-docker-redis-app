import { Module } from '@nestjs/common';
import { RedisModule } from 'nestjs-redis';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule, ConfigService}  from '@nestjs/config';
import redisConfig from './config/redis.config';
//configService.get('redisUrl')


console.dir(redisConfig());

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        load: [redisConfig]
      }
    ),
    RedisModule.forRootAsync({
      imports: [ConfigModule.forRoot({
        load: [redisConfig]
      })],
      useFactory:  (configService: ConfigService) => {

        return {
          url: configService.get('redisConf.redisUrl') ,
          name: 'redis-db'
        }
        
    },
      inject:[ConfigService],
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
