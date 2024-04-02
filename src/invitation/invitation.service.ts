import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Invitation, InvitationDocument } from './schema/invitation.schema';
import { Model } from 'mongoose';
import { ICreateInvitation } from './types';

@Injectable()
export class InvitationService {
    constructor(
        @InjectModel(Invitation.name) private invitationModel: Model<InvitationDocument>
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
