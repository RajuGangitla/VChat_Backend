import { Injectable } from '@nestjs/common';
import { Users, UsersDocument } from './schema/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICreateProfile } from './types';
import { verifyKey } from '@unkey/api';



@Injectable()
export class UsersService {
    constructor(
        @InjectModel(Users.name) private userModel: Model<UsersDocument>,
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
            const { result, error } = await verifyKey({
                apiId: "api_3C7xwzUzhaCw4uredhkANB8J9aP8",
                key: "raju_3ZMFcLkj5PmPWsQfMMRtwg6R"
            })

            console.log(result.code, "CODE")

            if (error) {
                // handle network error
            }

            if (!result.valid) {
                // reject unauthorized request
            }
            return await this.getUser(user?._id)
        } catch (error) {
            console.log(error.message)
        }
    }


}
