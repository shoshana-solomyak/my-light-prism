import { createHmac } from "crypto";
import { HASH_ALG } from "src/whatsapp-webhook/functions/validate-meta-payload.function";

/**
 * Generate request signature for mocking requests to webhooks
 * @param rawBody
 * @param secret
 * @returns signature to add to request header
 */
export const generateSignature = (rawBody = "", secret: string) =>
    `${HASH_ALG}=${createHmac(HASH_ALG, secret).update(rawBody).digest("hex")}`;
