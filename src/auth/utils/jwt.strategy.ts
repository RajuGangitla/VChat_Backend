import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, Payload, ExtractJwt } from "passport-jwt"
import { UsersService } from "src/users/users.service";


const cookieExtractor = (req) => {
    let token = null
    if (req && req.cookies && req.cookies["authorization"]) {
        const authorization = req.cookies["authorization"]
        if (authorization) token = authorization.replace("Bearer ", "")
    } else {
        const authorization = req?.headers?.authorization
        if (authorization) token = authorization.replace("Bearer ", "")
    }
    return token
}

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor(
        private userService: UsersService,
        private configService: ConfigService,
    ) {
        super({
            jwtFromRequest: cookieExtractor,
            ignoreExpiration: false,
            secretOrKey: configService.get("JWT_SECRET"),
        })
    }

    async validate(payload: Payload) {
        const { userId } = payload
        const user = await this.userService.getUser(userId)
        if(!user){
            throw new UnauthorizedException()
        }
        return user
    }
}