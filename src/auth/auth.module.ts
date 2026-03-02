import { Module } from '@nestjs/common';
import { RefreshToken } from './refresh-token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, RefreshToken])],
    exports: [RefreshToken]
})
export class AuthModule { }
