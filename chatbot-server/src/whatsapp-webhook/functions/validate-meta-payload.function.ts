import { createHmac, timingSafeEqual } from "crypto";

/** @private exported for tests */
export const HASH_ALG = "sha256";

interface ValidateSignatureParams {
    /** Sha256 encryption secret */
    secret: string;
    /** The request signature to validate */
    signature?: string;
    /** The raw body of the request */
    rawBody?: string;
}

/**
 * Validates the sha256 signature of the Meta's payload sent to the post/whatsapp-webhook endpoint.
 * @param {ValidateSignatureParams} params
 * @returns whether the payload sha256 signature is valid
 */
export function validateMetaPayload({
    secret,
    signature,
    rawBody,
}: ValidateSignatureParams): boolean {
    if (!signature || typeof signature !== "string" || typeof rawBody !== "string")
        return false;

    const receivedStr = signature.replace(`${HASH_ALG}=`, ""); // Remove prefix "sha256="
    const expectedStr = createHmac(HASH_ALG, secret).update(rawBody).digest("hex");

    const receivedBuffer = Buffer.from(receivedStr, "utf8");
    const expectedBuffer = Buffer.from(expectedStr, "utf8");

    // `timingSafeEqual` expects input buffers to have the same byte length
    if (receivedBuffer.length !== expectedBuffer.length) return false;

    return timingSafeEqual(receivedBuffer, expectedBuffer);
}
