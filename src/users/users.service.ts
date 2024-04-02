import { Injectable } from '@nestjs/common';
import { Users, UsersDocument } from './schema/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICreateProfile } from './types';
import { InviteFriendsDto } from './dto/users.dto';
import { EmailService } from 'src/email/email.service';


@Injectable()
export class UsersService {
    constructor(
        @InjectModel(Users.name) private userModel: Model<UsersDocument>,
        private emailService: EmailService
    ) { }


    async createUser(data: ICreateProfile) {
        try {
            let userExist = await this.userModel.findOne({ email: data?.email })
            if (!userExist) {
                return await this.userModel.create(data)
            }
            return await this.userModel.findByIdAndUpdate(userExist?._id, data)
        } catch (error) {
            console.log(error.message)
        }
    }


    async getUser(userId: string) {
        try {
            const user = await this.userModel.findById(userId)
            return user
        } catch (error) {
            console.log(error.message)
        }
    }

    async getUserById(user) {
        try {
            return await this.getUser(user?._id)
        } catch (error) {
            console.log(error.message)
        }
    }

    async inviteFriends(user, inviteFriendsDto: InviteFriendsDto) {
        try {
            let result = Promise.all(
                inviteFriendsDto?.invitees?.map(async (email: string) => {
                    await this.emailService.invitation(user, email)
                })
            )
            return result
        } catch (error) {
            console.log(error.message)
        }
    }
}
