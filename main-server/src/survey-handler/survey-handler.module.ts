import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { PatientModule } from "src/patient/patient.module";
import { TherapistModule } from "src/therapist/therapist.module";

import { SurveyHandlerController } from "./survey-handler.controller";
import { SurveyHandlerService } from "./survey-handler.service";

@Module({
    imports: [PatientModule, TherapistModule, JwtModule],
    providers: [SurveyHandlerService],
    controllers: [SurveyHandlerController],
})
export class SurveyHandlerModule {}
