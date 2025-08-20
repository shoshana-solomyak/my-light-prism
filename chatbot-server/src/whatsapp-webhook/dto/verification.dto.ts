import { ForbiddenException } from "@nestjs/common";

import {
    Equals,
    IsNotEmpty,
    IsNumberString,
    Validate,
    ValidatorConstraint,
    type ValidatorConstraintInterface,
} from "class-validator";

import type { MetaAPI } from "../types/meta-api.namespace";

/**
 * Validates a given value against our own generated `WEBHOOK_VERIFY_TOKEN`.
 * @see https://developers.facebook.com/docs/graph-api/webhooks/getting-started#validate-requests
 */
@ValidatorConstraint({ async: false })
class VerifyTokenValidator implements ValidatorConstraintInterface {
    validate(value: unknown): boolean {
        if (typeof value !== "string" || value !== process.env.WEBHOOK_VERIFY_TOKEN)
            throw new ForbiddenException("Invalid verify_token provided");

        return true;
    }
}

export class MetaVerificationDto implements MetaAPI.VerificationQuery {
    @IsNotEmpty()
    @Equals("subscribe")
    "hub.mode"!: "subscribe";

    @IsNotEmpty()
    @IsNumberString()
    "hub.challenge"!: number;

    @IsNotEmpty()
    @Validate(VerifyTokenValidator)
    "hub.verify_token"!: string;
}
