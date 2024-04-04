import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './schema/users.schema';
import { PassportModule } from '@nestjs/passport';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule { }
