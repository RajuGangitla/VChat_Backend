import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { currentUser } from 'src/auth/utils/currentUser.decorator';
import { Users } from './schema/users.schema';
import { JwtAuthGuard } from 'src/auth/utils/jwt.guard';
import { InviteFriendsDto } from './dto/users.dto';

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
    @Post("/inviteFriends")
    async inviteFriends(@currentUser() user: Users, @Body() inviteFriendsDto: InviteFriendsDto) {
        return await this.userService.inviteFriends(user, inviteFriendsDto)
    }


}   
