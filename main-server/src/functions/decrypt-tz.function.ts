import { createCipherivObject } from "./create-cipher-iv.function";

/**
 * This function decrypt some data
 */
export const decryptTz = (data: string) => {
    const decipher = createCipherivObject("decryption");

    // Decrypt the encrypted text
    let decrypted = decipher.update(data, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
};
