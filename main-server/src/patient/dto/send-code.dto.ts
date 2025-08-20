import { IsNotEmpty, IsString, Matches } from "class-validator";

import { DATE_ONLY_REGEX } from "@internal/constants";

export class PatientLoginSendCodeDTO {
    @IsString()
    @IsNotEmpty()
    tz!: string;

    @IsNotEmpty()
    @IsString()
    @Matches(DATE_ONLY_REGEX, {
        message: "birthDate must be in YYYY-MM-DD format without time",
    })
    birthDate!: string;
}
