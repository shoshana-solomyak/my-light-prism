import { IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";

export class CreatePatientDto {
    @IsNotEmpty()
    tz!: string;

    @IsString()
    @IsNotEmpty()
    firstName!: string;

    @IsOptional()
    @IsString()
    lastName?: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber!: string;

    @IsOptional()
    @IsObject()
    patientDetailsResponse?: Object;

    @IsNotEmpty()
    @IsString()
    healthcareCenterId!: string;
}
