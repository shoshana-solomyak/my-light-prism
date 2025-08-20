import { Prop, Schema } from "@nestjs/mongoose";

import { User, UserSchema, extendSchema } from "@hilma/auth-mongo-nest";

import { applyFilterByRole } from "../../functions/apply-filter-by-role.function";

@Schema({ timestamps: true })
export class Therapist extends User {
    createdAt!: Date;
    updatedAt!: Date;

    @Prop({ type: String, required: true })
    firstName!: string;

    @Prop({ type: String })
    lastName?: string;

    @Prop({ type: String, required: true })
    healthcareCenterId!: string;

    @Prop({ type: Object })
    therapistDetailsResponse?: Object;
}

export const therapistSchema = extendSchema(UserSchema, Therapist);
applyFilterByRole(therapistSchema);

export type TherapistDocument = Therapist & Document;
