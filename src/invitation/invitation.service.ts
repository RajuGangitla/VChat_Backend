import { HttpException, HttpStatus, Inject, Injectable, InternalServerErrorException, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Invitation, InvitationDocument } from './schema/invitation.schema';
import { Model } from 'mongoose';
import { ICreateInvitation } from './types';
import { InviteFriendsDto } from 'src/users/dto/users.dto';
import { EmailService } from 'src/email/email.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class InvitationService {
    constructor(
        @InjectModel(Invitation.name) private invitationModel: Model<InvitationDocument>,
        @Inject(forwardRef(() => EmailService))
        private emailService: EmailService,
    ) { }


    async createInvitation(data: ICreateInvitation) {
        try {
            let inviteId = await this.customInviteId()
            await this.invitationModel.create({
                ...data,
                invitationId: inviteId
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    async inviteFriends(user, inviteFriendsDto: InviteFriendsDto) {
        try {
            let alreadyInvitationSent = await this.invitationModel.findOne({ email: inviteFriendsDto.email })
            console.log(alreadyInvitationSent, "alreadyInvitationSent")
            if (alreadyInvitationSent) {
                throw new HttpException({
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Invitation has already been sent.',
                }, HttpStatus.INTERNAL_SERVER_ERROR);
            }

            let result = await this.emailService.invitation(user, inviteFriendsDto)
            return result
        } catch (error) {
            console.log(error.message)
            throw error;
        }
    }


    async customInviteId() {
        try {
            let count = await this.invitationModel.countDocuments()
            let numericPart = (count + 1).toString().padStart(5, '0');
            let InvitationId = `INV${numericPart}`;
            return InvitationId
        } catch (error) {
            console.log(error.message)
        }
    }

}
