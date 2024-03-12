import { BadGatewayException, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor() { }

    async googleLogin() {
        try {
            console.log("Hiiiiiiiiiiii")
        } catch (error) {
            console.log(error.message)
        }
    }
}
