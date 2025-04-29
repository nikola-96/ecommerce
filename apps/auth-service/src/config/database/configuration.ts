import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  private readonly logger = new Logger(TypeOrmConfigService.name);

  constructor(private readonly configService: ConfigService) {}

  onModuleInit(): void {
    this.logger.log('📘 TypeORM Module Successfully Initialized');
  }

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get('postgresConfig.host'),
      port: this.configService.get('postgresConfig.port'),
      username: this.configService.get('postgresConfig.username'),
      password: this.configService.get('postgresConfig.password'),
      database: this.configService.get('postgresConfig.database'),
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize:
        this.configService.get('postgresConfig.synchronize') === 'true',
    };
  }
}