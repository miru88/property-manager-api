import { UsersService } from './user.service';
import { Body, Controller, Get, Post, Delete, Patch, Request, UseGuards } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UsersService) {}

    @Public()
    @Post('create')
    async createUser(@Body() body: {user: CreateUserDto}) {

        const user: Partial<User> = body.user;

        if(user && user.email && user.password){

            await this.userService.createUser(user.email, user.password);
        }


    }

    @Public()
    @Get('all')
    async getAllUsers() {
        return await this.userService.getAllUsers();
    }


    deleteUser(@Body() body: any) {

    }

    updateUser(@Body() body: any) {

    }

    getUser(@Body() body: any) {

    }

    getUsers(@Body() body: any) {

    }




}
