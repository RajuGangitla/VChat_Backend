import { Module, forwardRef } from '@nestjs/common';
import { InvitationController } from './invitation.controller';
import { InvitationService } from './invitation.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Invitation, InvitationSchema } from './schema/invitation.schema';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Invitation.name, schema: InvitationSchema }]),
    forwardRef(() => EmailModule)
  ],
  controllers: [InvitationController],
  providers: [InvitationService],
  exports: [InvitationService]
})
export class InvitationModule { }
