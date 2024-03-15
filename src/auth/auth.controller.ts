import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';


@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private configService: ConfigService
    ) { }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleLogin() { }


    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleLoginCallback(@Req() req, @Res({ passthrough: true }) res:Response) {
        await this.authService.validateUser(req.user, res)
        return res.redirect(this.configService.get("FRONTEND_URL"));
    }
}
