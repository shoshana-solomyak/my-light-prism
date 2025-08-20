import { createCipherivObject } from "./create-cipher-iv.function";

/**
 * This function encrypt some data
 */
export const encryptTz = (data: string) => {
    const cipher = createCipherivObject("encryption");

    // Encrypt the plain text
    let encrypted = cipher.update(data, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
};
