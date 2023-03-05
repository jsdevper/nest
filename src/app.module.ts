import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ContentsModule } from './contents/contents.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    ContentsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('host'),
        port: 3306,
        username: configService.get<string>('username'),
        password: configService.get<string>('password'),
        database: configService.get<string>('database'),
        entities: [User],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
