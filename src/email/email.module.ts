import { Module, forwardRef } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { InvitationModule } from 'src/invitation/invitation.module';


@Module({
    imports: [
        forwardRef(() => InvitationModule)
    ],
    controllers: [EmailController],
    providers: [EmailService],
    exports: [EmailService]
})
export class EmailModule { }
