import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './utils/googlestrategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWTStrategy } from './utils/jwt.strategy';

@Module({
    imports: [
        ConfigModule,
        UsersModule,
        PassportModule.register({ defaultStrategy: "jwt" }),
        JwtModule.registerAsync({
            global:true,
            imports:[ConfigModule],
            inject:[ConfigService],
            useFactory: (configService: ConfigService)=>({
                secret: configService.get("JWT_SECRET"),
                signOptions:{
                    expiresIn:'120s'
                }
            })            
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, GoogleStrategy, JWTStrategy],
    exports: [AuthService]
})
export class AuthModule { }
