import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20"
import { UsersService } from "src/users/users.service"


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy){
    constructor(
        private configService: ConfigService,
        private usersService:UsersService
    ){
        super({
            clientID: configService.get("GOOGLE_CLIENT_ID"),
            clientSecret: configService.get("GOOGLE_SECRET_KEY"),
            callbackURL: configService.get("GOOGLE_REDIRECT_URL"),
            scope:['profile', 'email']
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback,){
        const { id, name, emails, photos } = profile;
        const user = {
            provider: 'google',
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            profilePicture: photos[0].value,
            accessToken: accessToken
        };
        done(null, user);
    }


}