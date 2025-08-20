import fc from "fast-check";
import { generateSignature } from "test/webhook/generate-request-signature.function";

import { validateMetaPayload } from "./validate-meta-payload.function";

const META_APP_SECRET = "test-secret";

/**
 * The tests:
 */
describe("validateMetaPayload", () => {
    it("should return true for valid signature", () => {
        const prop = fc.property(fc.string(), (rawBody) => {
            const validSignature = generateSignature(rawBody, META_APP_SECRET);

            expect(
                validateMetaPayload({
                    rawBody,
                    signature: validSignature,
                    secret: META_APP_SECRET,
                }),
            ).toBe(true);
        });

        fc.assert(prop);
    });

    it("should return false for invalid signature", () => {
        const prop = fc.property(
            fc.string(),
            fc.string(),
            (rawBody, invalidSecret) => {
                const invalidSignature = generateSignature(rawBody, invalidSecret);

                expect(
                    validateMetaPayload({
                        rawBody,
                        signature: invalidSignature,
                        secret: META_APP_SECRET,
                    }),
                ).toBe(false);
            },
        );

        fc.assert(prop);
    });

    it("should return false for missing rawBody", () => {
        const rawBody = undefined as unknown as string;

        const validSignature = generateSignature(rawBody, META_APP_SECRET);

        expect(
            validateMetaPayload({
                rawBody,
                signature: validSignature,
                secret: META_APP_SECRET,
            }),
        ).toBe(false);
    });

    it("should return false for missing signature", () => {
        const prop = fc.property(fc.string(), (rawBody) => {
            expect(
                validateMetaPayload({
                    rawBody,
                    signature: undefined,
                    secret: META_APP_SECRET,
                }),
            ).toBe(false);
        });

        fc.assert(prop);
    });
});
