import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId } from "mongoose";


export type InvitationDocument = Invitation & Document

@Schema({ timestamps: true })
export class Invitation {

    @Prop({ required: true })
    invitationId: string

    @Prop({ required: true })
    email: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Users" })
    invitedBy: mongoose.Schema.Types.ObjectId

    @Prop({ required: false })
    status: string
}

export const InvitationSchema = SchemaFactory.createForClass(Invitation)