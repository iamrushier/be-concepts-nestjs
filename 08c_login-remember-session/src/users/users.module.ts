import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Module({
  providers: [UsersService, User],
  exports: [User]
})
export class UsersModule { }
