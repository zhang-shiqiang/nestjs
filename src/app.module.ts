import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [],
      useFactory: async () => ({
        type: 'mysql',
        host: '81.69.47.226',
        port: 3306,
        username: 'root',
        password: '!Aa123456',
        database: 'testdb',
        synchronize: true,
        entities: [User],
      }),
    }),
    UserModule,
  ],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
