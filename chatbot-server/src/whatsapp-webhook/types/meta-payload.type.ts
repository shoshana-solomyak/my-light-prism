import type { MessageType } from "../constants/meta-message.constant";
import type { MetaContact } from "./meta-contact.type";
import type { MetaError } from "./meta-error.type";
import type { MetaMessage } from "./meta-message.type";
import type { MetaStatus } from "./meta-status.type";

/**
 * @see https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/components for full API Reference
 * @private
 */
/* eslint-disable @typescript-eslint/naming-convention -- Names given by Meta */
export interface MetaPayload {
    object: "whatsapp_business_account";
    entry: {
        id: string;
        changes: {
            field: "messages";
            value: {
                messaging_product: "whatsapp";
                metadata: {
                    display_phone_number: string;
                    phone_number_id: string;
                };
                contacts?: MetaContact[];
                errors?: MetaError[];
                messages?: MetaMessage<MessageType>[];
                statuses?: MetaStatus[];
            };
        }[];
    }[];
}
/* eslint-enable @typescript-eslint/naming-convention -- Names given by Meta */
