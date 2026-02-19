import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    create(createUserDto: CreateUserDTO) {
        return {
            message: 'User created successfully',
            data: createUserDto,
        };
    }
}
