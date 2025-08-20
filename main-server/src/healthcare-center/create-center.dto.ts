import { IsNotEmpty, IsString } from "class-validator";

export class CreateCenterDto {
    @IsString()
    @IsNotEmpty()
    address!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    @IsString()
    phoneNumber!: string;
}
