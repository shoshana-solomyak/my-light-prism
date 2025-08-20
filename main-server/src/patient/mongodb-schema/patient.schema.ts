import { Prop, Schema } from "@nestjs/mongoose";

import { User, UserSchema, extendSchema } from "@hilma/auth-mongo-nest";

import { applyFilterByRole } from "../../functions/apply-filter-by-role.function";

@Schema({ timestamps: true })
export class Patient extends User {
    createdAt!: Date;
    updatedAt!: Date;

    @Prop({ type: String, required: true })
    firstName!: string;

    @Prop({ type: String })
    lastName?: string;

    @Prop({ type: String })
    phoneNumber?: string;

    @Prop({ type: Date })
    birthDate?: Date;

    @Prop({ type: String, required: true })
    healthcareCenterId!: string;

    @Prop({ type: Object })
    patientDetailsResponse?: Object;

    @Prop({ type: Object })
    patientTraumaResponse?: Object;
}

export const patientSchema = extendSchema(UserSchema, Patient);
applyFilterByRole(patientSchema);

export type PatientDocument = Patient & Document;
