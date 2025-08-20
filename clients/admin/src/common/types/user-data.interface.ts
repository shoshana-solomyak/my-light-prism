import { type Role } from "./role.interface";

// Todo move to `@internal/types` and use in server
export interface UserData {
    createdAt: string;
    firstName: string;
    lastName: string;
    roles: Role[];
    type: string;
    updatedAt: string;
    username: string;
    _id: string;
}
