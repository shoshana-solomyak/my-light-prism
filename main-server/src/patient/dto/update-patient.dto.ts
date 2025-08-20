import { IsObject, IsOptional } from "class-validator";

export class UpdatePatientDto {
    @IsOptional()
    @IsObject()
    patientDetailsResponse?: Record<string, unknown>;

    @IsOptional()
    @IsObject()
    patientTraumaResponse?: Object;
}
