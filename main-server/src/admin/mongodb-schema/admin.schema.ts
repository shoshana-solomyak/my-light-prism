import { Prop, Schema } from "@nestjs/mongoose";

import { User, UserSchema, extendSchema } from "@hilma/auth-mongo-nest";

import { applyFilterByRole } from "../../functions/apply-filter-by-role.function";

@Schema()
export class Admin extends User {
    @Prop({ type: String, required: true })
    firstName!: string;

    @Prop({ type: String })
    lastName?: string;

    @Prop({ type: String })
    coolAdminField?: string;

    @Prop({ type: String, required: true })
    phoneNumber!: string;

    @Prop({ type: String, required: true })
    healthcareCenterId!: string;
}

export const adminSchema = extendSchema(UserSchema, Admin);
applyFilterByRole(adminSchema);

export type AdminDocument = Admin & Document;
