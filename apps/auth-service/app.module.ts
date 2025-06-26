import { Module } from '@nestjs/common';

import configuration from './src/config/env/configuration';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './src/config/database/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './src/users/users.module';
import { AuthModule } from './src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
