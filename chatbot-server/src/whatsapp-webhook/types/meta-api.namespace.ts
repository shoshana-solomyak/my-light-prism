import type { MessageType } from "../constants/meta-message.constant";
import type { MetaMessage } from "./meta-message.type";
import type { MetaPayload } from "./meta-payload.type";
import type { MetaVerificationQuery } from "./meta-verification-query.type";

/**
 * @see https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/components for full API Reference
 */
export namespace MetaAPI {
    export type Payload = MetaPayload;
    export type VerificationQuery = MetaVerificationQuery;
    export type Message<T extends MessageType = "unknown"> = MetaMessage<T>;
}
