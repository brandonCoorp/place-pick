import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeOptionsFactory, SequelizeModuleOptions } from '@nestjs/sequelize';

@Injectable()
export class DatabaseConfigService implements SequelizeOptionsFactory {
  constructor(private configService: ConfigService) {}

  createSequelizeOptions(): SequelizeModuleOptions {
    return {
      dialect: 'postgres',

      host: this.configService.get<string>('DB_HOST'), 
      port: Number(this.configService.get<number>('DB_PORT') || 5432),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),

      autoLoadModels: true,
      synchronize: false,

      logging: false,

      pool: {
        max: 2,        
        min: 0,
        idle: 10000,
        acquire: 30000,
        evict: 10000,
      },

     /* dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
        keepAlive: true, 
      },*/

      retry: {
        max: 2,
      },
    };
  }
}