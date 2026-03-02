import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { RefreshToken } from './auth/refresh-token.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'auth_db',
      entities: [User, RefreshToken],
      synchronize: true
    }),
    AuthModule,
    UsersModule
  ],
})
export class AppModule { }
