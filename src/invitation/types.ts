

export interface ICreateInvitation {
    email: string
    invitedBy: string
    status: "Invited" | "Accepeted" | "Joined"
}

export enum InvitationStatus {
    Invited = "Invited",
    Accepted = "Accepted",
    Joined = "Joined"
}


"Hiiiiiiiiiiiiiiiiiiiiiiii"
