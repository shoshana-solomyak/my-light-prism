import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

import type { CreateAdmin } from "@internal/types";

export class CreateAdminDto implements CreateAdmin {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsString()
    @IsNotEmpty()
    firstName!: string;

    @IsString()
    @IsNotEmpty()
    lastName!: string;

    @IsNotEmpty()
    @IsString()
    phoneNumber!: string;

    @IsOptional()
    @IsString()
    coolAdminField?: string;

    @IsNotEmpty()
    @IsString()
    healthcareCenterId!: string;
}
