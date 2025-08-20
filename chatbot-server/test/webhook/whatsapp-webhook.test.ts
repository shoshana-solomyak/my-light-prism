import { HttpStatus, type INestApplication } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";

import fc from "fast-check";
import { SIGNATURE_HEADER_NAME } from "src/whatsapp-webhook/guards/meta-payload.guard";
import { WhatsappWebhookModule } from "src/whatsapp-webhook/whatsapp-webhook.module";
import request from "supertest";

import { setupTestingApp } from "../setup-testing-app.function";
import { generateSignature } from "./generate-request-signature.function";

const META_APP_SECRET = "test-secret";
const WEBHOOK_VERIFY_TOKEN = "test-verify-token";

const whatsappWebhookEndpoint = "/api/whatsapp-webhook";

const nonNumericString = fc.string().filter((str) => {
    return str.length === 0 || /\D/.test(str);
});

const getQueryParams = (
    mode: unknown,
    challenge: unknown,
    verifyToken: unknown,
) => ({
    "hub.mode": mode,
    "hub.challenge": challenge,
    "hub.verify_token": verifyToken,
});

const metaPayload = {
    object: "whatsapp_business_account",
    entry: [],
};

describe("Webhook", () => {
    let app: INestApplication;
    let server: ReturnType<INestApplication["getHttpServer"]>;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [WhatsappWebhookModule],
        }).compile();

        process.env.META_APP_SECRET = META_APP_SECRET;
        process.env.WEBHOOK_VERIFY_TOKEN = WEBHOOK_VERIFY_TOKEN;

        app = setupTestingApp(module);
        await app.init();

        server = app.getHttpServer();
    });

    afterAll(async () => {
        delete process.env.META_APP_SECRET;
        delete process.env.WEBHOOK_VERIFY_TOKEN;

        await app.close();
    });

    it("GET should return the challenge for a valid verification request", async () => {
        const prop = fc.asyncProperty(fc.integer(), async (challenge) => {
            const res = await request(server)
                .get(whatsappWebhookEndpoint)
                .query(getQueryParams("subscribe", challenge, WEBHOOK_VERIFY_TOKEN))
                .expect(HttpStatus.OK);

            expect(res.text).toEqual(challenge.toString());
        });

        await fc.assert(prop);
    });

    it("GET should reject a verification request with an invalid verify token", async () => {
        const prop = fc.asyncProperty(
            fc.integer(),
            fc.string(),
            async (challenge, verifyToken) => {
                const res = await request(server)
                    .get(whatsappWebhookEndpoint)
                    .query(getQueryParams("subscribe", challenge, verifyToken))
                    .expect(HttpStatus.FORBIDDEN);

                expect(res.body.message).toBe("Invalid verify_token provided");
            },
        );

        await fc.assert(prop);
    });

    it("GET should reject a verification request with invalid query params", async () => {
        const prop = fc.asyncProperty(
            fc.string(),
            nonNumericString,
            async (mode, challenge) => {
                const res = await request(server)
                    .get(whatsappWebhookEndpoint)
                    .query(getQueryParams(mode, challenge, WEBHOOK_VERIFY_TOKEN))
                    .expect(HttpStatus.BAD_REQUEST);

                expect(res.body.message).toEqual(
                    expect.arrayContaining([
                        expect.stringMatching(/^hub.mode/),
                        expect.stringMatching(/^hub.challenge/),
                    ]),
                );
            },
        );

        await fc.assert(prop, { numRuns: 10 });
    });

    it("POST should accept a valid payload", async () => {
        const body = metaPayload;
        const signature = generateSignature(JSON.stringify(body), META_APP_SECRET);

        await request(server)
            .post(whatsappWebhookEndpoint)
            .set(SIGNATURE_HEADER_NAME, signature)
            .send(body)
            .expect(HttpStatus.OK);
    });

    it("POST should reject a payload with an invalid signature", async () => {
        const body = metaPayload;
        const invalidSignature = "sha256=invalid_signature";

        await request(server)
            .post(whatsappWebhookEndpoint)
            .set(SIGNATURE_HEADER_NAME, invalidSignature)
            .send(body)
            .expect(HttpStatus.FORBIDDEN);
    });
});
