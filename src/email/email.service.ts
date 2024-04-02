import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { promises as fsPromises } from 'fs';
import * as ejs from 'ejs';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { Users } from 'src/users/schema/users.schema';
import { InvitationService } from 'src/invitation/invitation.service';
import { InvitationStatus } from 'src/invitation/types';


@Injectable()
export class EmailService {
    private readonly transporter;
    constructor(
        private configService: ConfigService,
        private invitationService: InvitationService
    ) {
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: configService.get("FROM_MAIL"),
                pass: configService.get("MAIL_PASSWORD")
            },
        });
    }


    async invitation(user, email: string) {
        try {
            const templatePath = path.join(process.cwd(), 'src', 'email', 'templates', 'invitation.ejs')

            let frontendUrl = this.configService.get("FRONTEND_URL")
            const templateContent = await fsPromises.readFile(templatePath, 'utf8');
            const renderedHtml = ejs.render(templateContent, {
                recipientName: email,
                inviteLink: `${frontendUrl}/invitation?token=${1234}`,
                currentUser: user?.firstName + " " + user?.lastName
            });

            await this.transporter.sendMail({
                to: email,
                from: "raju@zedblock.com",
                subject: 'Invitation From V Chat',
                html: renderedHtml
            })

            await this.invitationService.createInvitation({
                email: email,
                invitedBy: user?._id,
                status: InvitationStatus.Invited
            })
        } catch (error) {
            console.log(error.message)
        }
    }

}
