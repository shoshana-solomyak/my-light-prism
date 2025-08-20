import { Module } from "@nestjs/common";

import { PatientModule } from "src/patient/patient.module";

import {
    RefreshTokenModule,
    TwoFactorModule,
    UserModule,
} from "@hilma/auth-mongo-nest";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [
        UserModule,
        PatientModule,
        TwoFactorModule.register({
            phoneField: "phoneNumber",
            sendInEnvironments: ["production"],
            codeLength: 6,
        }),
        RefreshTokenModule,
    ],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
