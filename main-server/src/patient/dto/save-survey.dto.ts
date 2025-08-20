import { IsEnum, IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";

import { SURVEY_ACTIONS, SURVEY_IDS } from "@internal/constants";
import { SurveyAction } from "@internal/types";

export class SaveSurveyDto {
    @IsNotEmpty()
    @IsEnum(SURVEY_ACTIONS)
    actionType!: SurveyAction;

    @IsNotEmpty()
    @IsObject()
    surveyData!: Record<string, unknown>;

    @IsOptional()
    @IsString()
    id?: string;

    @IsNotEmpty()
    @IsEnum(SURVEY_IDS)
    surveyId!: string;
}
