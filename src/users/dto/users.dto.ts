import { IsArray, IsNotEmpty, IsString } from "class-validator"

export class InviteFriendsDto {
    @IsString()
    @IsNotEmpty()
    firstName: string

    @IsString()
    @IsNotEmpty()
    lastName: string

    @IsString()
    @IsNotEmpty()
    email: string

}

