import {
    CanActivate,
    type ExecutionContext,
    Injectable,
    Logger,
    UnauthorizedException,
    UseGuards,
    applyDecorators,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { Request } from "express";
import { SURVEY_JSONS } from "src/constants/survey-jsons.constant";

import { RequestUserType } from "@hilma/auth-mongo-nest";

import { SURVEY_ACTIONS } from "@internal/constants";
import { type SurveyAction, SurveyId } from "@internal/types";

import { actionAuthMap } from "../../auth/constants/authorization-functions";
import { JWT_COOKIE_NAME } from "../../auth/constants/cookie.constants";

/**
 * Custom auth guard used for the survey handler endpoint to handle different authorization login based on the action type.
 */

@Injectable()
export class SurveyActionGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
    private readonly logger = new Logger(SurveyActionGuard.name);

    canActivate(context: ExecutionContext): boolean {
        try {
            const request = context.switchToHttp().getRequest<Request>();

            const token = request.cookies[JWT_COOKIE_NAME];

            //Get the user from the cookie
            if (token) {
                try {
                    const user = this.jwtService.verify<RequestUserType>(token, {
                        secret: process.env.JWT_SECRET,
                    });
                    request.user = user; // Attach user to request
                } catch {
                    throw new Error("Invalid or expired token.");
                }
            }

            const user = request.user;

            const surveyId: SurveyId = request.body?.surveyId;

            if (
                !("actionType" in SURVEY_JSONS[surveyId]) ||
                !Object.values(SURVEY_ACTIONS).includes(
                    SURVEY_JSONS[surveyId].actionType as SurveyAction,
                )
            ) {
                throw new Error("Missing or invalid action type");
            }
            const actionType = SURVEY_JSONS[surveyId].actionType;
            request.body.actionType = actionType;

            const authFn = actionAuthMap[actionType as SurveyAction];
            if (!authFn) {
                return true; //We define functions only for the action-types that need validation
            }

            const canActivate = authFn(user as RequestUserType);

            if (!canActivate) {
                throw new UnauthorizedException(
                    "User is not authorized for this action",
                );
            }

            return true;
        } catch (err) {
            this.logger.log("error: ", err);
            throw new UnauthorizedException();
        }
    }
}
export function UseSurveyActionGuard() {
    return applyDecorators(UseGuards(SurveyActionGuard));
}
