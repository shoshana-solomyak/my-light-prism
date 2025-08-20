import type { MetaError } from "./meta-error.type";

/**
 * @metaApi
 * @private
 */
/* eslint-disable @typescript-eslint/naming-convention -- Names given by Meta */
export interface MetaStatus {
    id: string;
    recipient_id: string;
    status: "delivered" | "read" | "sent";
    timestamp: string;
    biz_opaque_callback_data: string;
    conversation: {
        id: string;
        origin: {
            type: ConversationOriginType;
        };
        expiration_timestamp: string;
    };
    pricing: {
        category: PricingCategoryType;
        pricing_model: string;
    };
    errors: MetaError[];
}
/* eslint-enable @typescript-eslint/naming-convention -- Names given by Meta */

type ConversationOriginType =
    | "authentication"
    | "marketing"
    | "utility"
    | "service"
    | "referral_conversion";

type PricingCategoryType =
    | "authentication"
    | "authentication-international"
    | "marketing"
    | "utility"
    | "service"
    | "referral_conversion";
