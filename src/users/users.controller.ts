import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    // For testing API
    // @Get()
    // async getAllUsers(){
    //     return this.userService.findAll();
    // }

    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtGuard)
    @Get('profile')
    async getCurrentProfile(@GetCurrentUser() user){
        return this.userService.findById(user.id);
    }
}
