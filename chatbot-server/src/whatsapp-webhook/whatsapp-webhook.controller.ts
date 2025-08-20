import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Logger,
    OnModuleInit,
    Post,
    Query,
    Res,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import type { Response } from "express";

import { IS_DEVELOPMENT_ENV } from "../common/constants/is-development-env.constant";
import { MetaPayloadDto } from "./dto/payload.dto";
import { MetaVerificationDto } from "./dto/verification.dto";
import { checkMessageType } from "./functions/check-message-type.function";
import { UseMetaPayload } from "./guards/meta-payload.guard";

@ApiTags("whatsapp-Webhook")
@Controller("whatsapp-webhook")
export class WhatsappWebhookController implements OnModuleInit {
    private readonly logger = new Logger(WhatsappWebhookController.name);

    // ? Should move to Module?
    onModuleInit() {
        if (IS_DEVELOPMENT_ENV) return;
        [process.env.WEBHOOK_VERIFY_TOKEN, process.env.META_APP_SECRET].forEach(
            (envVar) => {
                if (!envVar) this.logger.error(`Missing env var: ${envVar}`);
            },
        );
    }

    @ApiOperation({
        summary: "Verify a whatsapp webhook connection",
        description:
            "An exposed endpoint for verifying the whatsapp webhook setup. Called by Meta",
    })
    @Get()
    get(
        @Res({ passthrough: true }) res: Response,
        @Query() { "hub.challenge": challenge }: MetaVerificationDto,
    ) {
        this.logger.log("Whatsapp Webhook verified successfully!");

        res.status(HttpStatus.OK);
        return challenge;
    }

    @ApiOperation({
        summary: "Handle Whatsapp webhook notifications",
        description:
            "An exposed endpoint for handling Whatsapp notifications our app listen to. Called by Meta",
    })
    @UseMetaPayload()
    @Post()
    post(
        @Res({ passthrough: true }) res: Response,
        @Body() payload: MetaPayloadDto,
    ) {
        this.logger.log("The signature is valid!");
        this.logger.verbose(payload);

        // TODO handle payload
        const messages = payload?.entry?.[0]?.changes?.[0]?.value?.messages;
        messages?.forEach((message) => {
            if (checkMessageType(message, "text"))
                this.logger.log(message.text.body);
        });

        /**
         * Meta expects a 200 response from the webhook, and will try to resend the request for 36h if not.
         * This endpoint should **NOT** throw an error if the logic did not succeed,
         * and be able to support duplicated requests in case of an error.
         * @see https://developers.facebook.com/docs/graph-api/webhooks/getting-started#validate-payloads
         */
        res.status(HttpStatus.OK);
    }
}
