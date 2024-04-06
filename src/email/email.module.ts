import { Module, forwardRef } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { InvitationModule } from 'src/invitation/invitation.module';
import { UsersModule } from 'src/users/users.module';


@Module({
    imports: [
        forwardRef(() => InvitationModule),
        UsersModule
    ],
    controllers: [EmailController],
    providers: [EmailService],
    exports: [EmailService]
})
export class EmailModule { }
