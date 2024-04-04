import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { currentUser } from 'src/auth/utils/currentUser.decorator';
import { InviteFriendsDto } from 'src/users/dto/users.dto';
import { Users } from 'src/users/schema/users.schema';
import { InvitationService } from './invitation.service';




@Controller('invitation')
export class InvitationController {
    constructor(private invitationService: InvitationService) { }


    @UseGuards(AuthGuard())
    @Post("/inviteFriends")
    async inviteFriends(@currentUser() user: Users, @Body() inviteFriendsDto: InviteFriendsDto) {
        return await this.invitationService.inviteFriends(user, inviteFriendsDto)
    }

}
