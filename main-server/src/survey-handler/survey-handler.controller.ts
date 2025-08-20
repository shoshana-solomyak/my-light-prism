import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";

import { ROLES } from "src/auth/constants/role.constants";
import { SaveSurveyDto } from "src/patient/dto/save-survey.dto";
import { UseSurveyActionGuard } from "src/survey-handler/constants/survey-action-guard.constants";

import {
    RequestUser,
    type RequestUserType,
    UseJwtInterceptor,
} from "@hilma/auth-mongo-nest";

import { SurveyHandlerService } from "./survey-handler.service";

@Controller("survey-handler")
export class SurveyHandlerController {
    constructor(
        @Inject(SurveyHandlerService)
        private readonly surveyHandlerService: SurveyHandlerService,
    ) {}

    @Post("submit")
    @UseSurveyActionGuard()
    @ApiOperation({
        summary: "handle survey response",
        description:
            "centralizes survey response data and processes it based on the actionType",
    }) //TODO organization
    @UseJwtInterceptor()
    postSubmit(
        @Body() { actionType, surveyData, id }: SaveSurveyDto,
        @RequestUser() connectedUser: RequestUserType,
    ) {
        const patientId =
            connectedUser && connectedUser.roles.includes(ROLES.patient.name)
                ? connectedUser._id
                : id;

        return this.surveyHandlerService.saveSurvey(
            actionType,
            surveyData,
            patientId,
        );
    }
}
