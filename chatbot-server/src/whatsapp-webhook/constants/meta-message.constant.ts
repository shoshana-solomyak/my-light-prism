export const MESSAGE_TYPE = {
    audio: "audio",
    button: "button",
    document: "document",
    text: "text",
    image: "image",
    interactive: "interactive",
    order: "order",
    sticker: "sticker",
    system: "system",
    unknown: "unknown",
    video: "video",
} as const satisfies Record<string, string>;

export type MessageType = (typeof MESSAGE_TYPE)[keyof typeof MESSAGE_TYPE];
