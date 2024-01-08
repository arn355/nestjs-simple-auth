import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService: UsersService,
        private readonly authService: AuthService,
        ){}

    @Post('register')
    async registerUser(@Body() createUserDto: CreateUserDto){
        return await this.userService.create(createUserDto);
    }

    @Post('login')
    async loginUser(@Body() loginDto: LoginDto){
        return await this.authService.login(loginDto);
    }
}
