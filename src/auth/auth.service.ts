import { BadGatewayException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { ICreateProfile } from 'src/users/types';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService:JwtService,
    ) { }

    async googleLogin() {
        try {
            console.log("Hiiiiiiiiiiii")
        } catch (error) {
            console.log(error.message)
        }
    }

    async validateUser(data: ICreateProfile, res:Response) {
        try {
            const user = await this.userService.createUser(data)
            const token = await this.jwtService.signAsync({ userId: user?._id }, { expiresIn: "365d", })
            res.cookie("authorization", `Bearer ${token}`, {
                httpOnly:true,
                secure:true,
                maxAge: Date.now() + 10 * 365 * 24 * 60 * 60,
                sameSite: "none",
            })
        } catch (error) {
            console.log(error.message)
        }
    }
}
