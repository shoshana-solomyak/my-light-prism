import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { WhatsappWebhookModule } from "./whatsapp-webhook/whatsapp-webhook.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env.${process.env.NODE_ENV}`,
            isGlobal: true,
        }),
        WhatsappWebhookModule,
    ],
})
export class AppModule {}
