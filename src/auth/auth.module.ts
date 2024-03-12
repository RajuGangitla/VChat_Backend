import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './utils/googlestrategy';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
        ConfigModule,
        UsersModule
    ],
    controllers: [AuthController],
    providers: [AuthService, GoogleStrategy],
    exports: [AuthService]
})
export class AuthModule { }
