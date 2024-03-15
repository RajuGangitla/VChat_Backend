import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { currentUser } from 'src/auth/utils/currentUser.decorator';
import { Users } from './schema/users.schema';
import { JwtAuthGuard } from 'src/auth/utils/jwt.guard';

@Controller('users')
export class UsersController {

    constructor(
        private userService: UsersService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get("/getUserById")
    async getUserById(@currentUser() user: Users) {
        return await this.userService.getUserById(user)
    }
}
