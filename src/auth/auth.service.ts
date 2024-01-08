import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/auth.dto';
import { compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService){}

    async login(loginDto: LoginDto){
        const user = await this.validateUser(loginDto);
        const payload = { sub: user.id, email: user.email }
        return {
            token: await this.jwtService.signAsync(payload)
        }
    }

    async validateUser(loginDto: LoginDto){
        const user = await this.userService.findByEmail(loginDto.username);

        if (user && (await compare(loginDto.password, user.password))){
            const {password, ...result} = user
            return result
        }

        throw new UnauthorizedException('username or password not correct.')
    }
}
