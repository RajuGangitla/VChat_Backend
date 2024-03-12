import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UsersDocument = Users & Document


@Schema({ timestamps: true })
export class Users {
    @Prop({ required: true })
    firstName: string

    @Prop({ required: true })
    lastName: string

    @Prop({ required: true })
    email: string

    @Prop({ required: false })
    profilePicture: string

    @Prop({ required: false })
    provider: string

    @Prop({ required: false })
    accessToken: string

}

export const UsersSchema = SchemaFactory.createForClass(Users)