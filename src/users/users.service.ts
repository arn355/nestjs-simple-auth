import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/user.dto';
import { hash } from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService){}

    async create(createUserDto: CreateUserDto){
        const user = await this.prisma.user.findUnique({
            where: {
                email: createUserDto.email,
            }
        })

        if (user) throw new ConflictException('Email Duplicated.')

        const newUser = await this.prisma.user.create({
            data: {
                ...createUserDto,
                password: await hash(createUserDto.password, 10),
            }
        })

        const { password, ...result } = newUser;
        return result
    }

    async findAll(){
        return await this.prisma.user.findMany();
    }

    async findById(id: string){
        const user = await this.prisma.user.findUnique({
            where: { id }
        });
        const { password, ...result } = user;
        return result
    }

    async findByEmail(email: string){
        return await this.prisma.user.findUnique({
            where: { email }
        })
    }
}
