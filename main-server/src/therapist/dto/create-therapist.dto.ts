import { IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";

export class TherapistRegisterDto {
    @IsString()
    @IsNotEmpty()
    tz!: string;

    @IsString()
    @IsNotEmpty()
    firstName!: string;

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsString()
    @IsOptional()
    birthDate?: string;

    @IsOptional()
    @IsObject()
    therapistDetailsResponse?: Object;

    @IsNotEmpty()
    @IsString()
    healthcareCenterId!: string;
}
