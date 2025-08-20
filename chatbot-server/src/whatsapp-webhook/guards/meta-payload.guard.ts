import {
    CanActivate,
    type ExecutionContext,
    Injectable,
    UseGuards,
    applyDecorators,
} from "@nestjs/common";

import { validateMetaPayload } from "../functions/validate-meta-payload.function";

/** @private exported for tests */
export const SIGNATURE_HEADER_NAME = "x-hub-signature-256";

@Injectable()
class MetaPayloadGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const secret = process.env.META_APP_SECRET as string;

        const req = context.switchToHttp().getRequest();
        const signature = req.header(SIGNATURE_HEADER_NAME);
        const rawBody = req.rawBody?.toString();

        return validateMetaPayload({ signature, rawBody, secret });
    }
}

/**
 * This guard validates and returns the payload received from Meta via whatsapp-webhook.
 * @see https://developers.facebook.com/docs/graph-api/webhooks/getting-started#validate-payloads for information about the validation method
 *
 * ! Webhook endpoints are exposed. Do not use their payloads without passing them through this decorator
 */ export function UseMetaPayload() {
    return applyDecorators(UseGuards(MetaPayloadGuard));
}
