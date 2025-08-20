/**
 * @metaApi
 * @private
 */
export interface MetaVerificationQuery {
    "hub.mode": "subscribe";
    "hub.challenge": number;
    "hub.verify_token": string;
}
