import { Injectable, NotFoundException } from "@nestjs/common";

import { SurveyId } from "@internal/types";

import { SURVEY_JSONS } from "../constants/survey-jsons.constant";
import { transformToAdminSurvey } from "./functions/transform-to-admin-survey.function";

@Injectable()
export class SurveySchemaService {
    getBySchemaId(schemaId: SurveyId, isAdmin?: boolean) {
        if (SURVEY_JSONS[schemaId]) {
            const survey = isAdmin
                ? transformToAdminSurvey(SURVEY_JSONS[schemaId])
                : SURVEY_JSONS[schemaId];

            if ("actionType" in survey) {
                // eslint-disable-next-line no-unused-vars -- remove actionType
                const { actionType, ...surveyWithoutActionType } = survey;
                return surveyWithoutActionType;
            }
            return survey;
        } else
            throw new NotFoundException(
                "Could not find a schema with the provided id",
            );
    }
}
