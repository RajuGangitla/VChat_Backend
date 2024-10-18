import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { currentUser } from 'src/auth/utils/currentUser.decorator';
import { Users } from './schema/users.schema';



@Controller('users')
export class UsersController {

    constructor(
        private userService: UsersService
    ) { }

    @UseGuards(AuthGuard())
    @Get("/getUserById")
    async getUserById(@currentUser() user: Users) {
        return await this.userService.getUserById(user)
    }


    @UseGuards(AuthGuard())
    @Get("/getUser")
    async getUser(@currentUser() user: Users) {

    }

}   
