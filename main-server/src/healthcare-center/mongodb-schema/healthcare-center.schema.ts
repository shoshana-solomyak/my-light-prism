import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { Document, ObjectId } from "mongoose";

@Schema({ timestamps: true })
export class HealthcareCenter {
    createdAt!: Date;
    updatedAt!: Date;

    @Prop({ type: String, required: true })
    name!: string;

    @Prop({ type: String, required: true })
    address?: string;

    @Prop({ type: String, required: true })
    phoneNumber?: string;
}

export const healthcareCenterSchema = SchemaFactory.createForClass(HealthcareCenter);

export type HealthcareCenterDocument = HealthcareCenter & Document<ObjectId>;
