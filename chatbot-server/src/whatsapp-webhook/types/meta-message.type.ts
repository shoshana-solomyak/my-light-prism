import type { Todo } from "@internal/types";

import type { MESSAGE_TYPE, MessageType } from "../constants/meta-message.constant";
import type { MetaError } from "./meta-error.type";

/* eslint-disable @typescript-eslint/naming-convention -- Names given by Meta */

/**
 * @metaApi Generic type of message with its relevant fields
 * @private
 */
export type MetaMessage<T extends MessageType = "unknown"> = BaseMessage &
    Pick<MessageField, T> & { type: T };

interface BaseMessage {
    id: string;
    from: string;
    timestamp: string;
    type: MessageType;
    identity: {
        acknowledged?: Todo;
        created_timestamp: string;
        hash: string;
    };
    /**
     * Only included when a user replies or interacts with one of your messages
     */
    context?: {
        id: string;
        from: string;
        forwarded?: boolean;
        frequently_forwarded?: boolean;
        referred_product?: {
            catalog_id: string;
            product_retailer_id: string;
        };
    };
    /**
     * When a customer clicks an ad that redirects to WhatsApp, this object is included in the messages object
     */
    referral?: {
        source_url: string;
        source_type: "ad" | "post";
        source_id: string;
        headline: string;
        body: string;
        media_type: string;
        image_url: string;
        video_url: string;
        thumbnail_url: string;
        /* Cspell: ignore ctwa clid */
        ctwa_clid: string;
    };
    errors: MetaError[];
}

interface MessageField {
    [MESSAGE_TYPE.audio]: {
        id: string;
        mime_type: string;
    };
    [MESSAGE_TYPE.button]: {
        payload: string;
        text: string;
    };
    [MESSAGE_TYPE.document]: {
        id: string;
        caption: string;
        filename: string;
        sha256: string;
        mime_type: string;
    };
    [MESSAGE_TYPE.text]: {
        body: string;
    };
    [MESSAGE_TYPE.image]: {
        id: string;
        caption: string;
        filename: string;
        sha256: string;
        mime_type: string;
    };
    [MESSAGE_TYPE.interactive]: {
        type: {
            button_reply?: {
                id: string;
                title: string;
            };
            list_reply?: {
                id: string;
                title: string;
                description: string;
            };
        };
    };
    [MESSAGE_TYPE.order]: {
        catalog_id: string;
        text: string;
        product_items: {
            product_retailer_id: string;
            quantity: string;
            item_price: string;
            currency: string;
        }[];
    };
    [MESSAGE_TYPE.sticker]: {
        id: string;
        sha256: string;
        mime_type: string;
        animated: boolean;
    };

    [MESSAGE_TYPE.system]: {
        body: string;
        identity: string;
        new_wa_id: string;
        wa_id: string;
        type: "customer_changed_number" | "customer_identity_changed";
        customer: string;
    };
    [MESSAGE_TYPE.video]: {
        id: string;
        caption: string;
        filename: string;
        sha256: string;
        mime_type: string;
    };
    /** Placeholder */
    [MESSAGE_TYPE.unknown]: never;
}

/* eslint-enable @typescript-eslint/naming-convention -- Names given by Meta */
