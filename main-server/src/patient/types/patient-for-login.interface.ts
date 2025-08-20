import { type Role } from "@hilma/auth-mongo-nest";

export interface PatientForLogin {
    username: string;
    phoneNumber: string;
    roles: Role[];
    _id: string;
    type: string;
}
