import type { MessageType } from "../constants/meta-message.constant";
import type { MetaAPI } from "../types/meta-api.namespace";

/**
 * @metaApi Type guard for MetaMessage type
 * @param message
 * @param type
 * @returns {boolean} is the message of the given type
 */
export function checkMessageType<T extends MessageType>(
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any -- the purpose of the decorator is to assert type  */
    message: MetaAPI.Message<any>,
    type: T,
): message is MetaAPI.Message<T> {
    return type in message && message.type === type;
}
