import { IsArray, IsNotEmpty, IsString } from "class-validator"

export class InviteFriendsDto {
    @IsArray()
    @IsNotEmpty()
    invitees: string[]

}

