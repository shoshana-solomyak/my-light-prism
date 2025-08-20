import { UnauthorizedException } from "@nestjs/common";

import { type RequestUserType } from "@hilma/auth-mongo-nest";

import { SURVEY_ACTIONS } from "@internal/constants";
import { type SurveyAction } from "@internal/types";

import { ROLES } from "./role.constants";

type ValidationFunction = (user: RequestUserType) => boolean;

//Authorization functions by action type
//Used for the custom auth decorator for the survey handler
const traumaGuard = (user: RequestUserType) => {
    if (!user) {
        throw new UnauthorizedException();
    }
    if (
        !(
            user.roles.includes(ROLES.patient.name) ||
            user.roles.includes(ROLES.admin.name)
        )
    ) {
        throw new UnauthorizedException("invalid role");
    }
    return true;
};

export const actionAuthMap: Partial<Record<SurveyAction, ValidationFunction>> = {
    [SURVEY_ACTIONS.traumaResponse]: traumaGuard,
};
