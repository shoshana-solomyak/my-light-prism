import { IsNotEmpty, IsObject } from "class-validator";

export class UpdateTherapistDto {
    @IsNotEmpty()
    @IsObject()
    therapistDetailsResponse!: Record<string, unknown>;
}
