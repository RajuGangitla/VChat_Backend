import { Inject, Injectable, forwardRef } from '@nestjs/common';
import * as path from 'path';
import { promises as fsPromises } from 'fs';
import * as ejs from 'ejs';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { InvitationService } from 'src/invitation/invitation.service';
import { InvitationStatus } from 'src/invitation/types';
import { InviteFriendsDto } from 'src/users/dto/users.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class EmailService {
    private readonly transporter;
    constructor(
        private configService: ConfigService,
        @Inject(forwardRef(() => InvitationService))
        private invitationService: InvitationService,
        private usersService: UsersService,
        private jwtService: JwtService
    ) {
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: configService.get("FROM_MAIL"),
                pass: configService.get("MAIL_PASSWORD")
            },
        });
    }


    async invitation(user, data: InviteFriendsDto) {
        try {
            const templatePath = path.join(process.cwd(), 'src', 'email', 'templates', 'invitation.ejs')
            let frontendUrl = this.configService.get("FRONTEND_URL")

            const createUser = await this.usersService.createUser(data)
            const token = await this.jwtService.signAsync({ userId: createUser?._id, email: createUser?.email }, { expiresIn: "2d", })

            const templateContent = await fsPromises.readFile(templatePath, 'utf8');
            const renderedHtml = ejs.render(templateContent, {
                recipientName: `${data?.firstName} ${data?.lastName}`,
                inviteLink: `${frontendUrl}/invitation?token=${token}`,
                currentUser: user?.firstName + " " + user?.lastName
            });

            await this.transporter.sendMail({
                to: data?.email,
                subject: 'Invitation From V Chat',
                html: renderedHtml
            })

            return await this.invitationService.createInvitation({
                email: data?.email,
                invitedBy: user?._id,
                status: InvitationStatus.Invited
            })
        } catch (error) {
            console.log(error.message)
        }
    }

}
