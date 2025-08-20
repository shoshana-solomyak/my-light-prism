import { Module } from "@nestjs/common";

import { WhatsappWebhookController } from "./whatsapp-webhook.controller";

/**
 * Whatsapp Webhook for Meta Graph API
 */
@Module({
    controllers: [WhatsappWebhookController],
})
export class WhatsappWebhookModule {}
