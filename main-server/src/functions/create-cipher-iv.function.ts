import {
    type Cipher,
    type Decipher,
    createCipheriv,
    createDecipheriv,
} from "crypto";

/**
 * Create a cipher object according to the type of cryptography process
 */
export function createCipherivObject<T extends "encryption" | "decryption">(
    cryptographyProcess: T,
): T extends "encryption" ? Cipher : Decipher {
    const algorithm = process.env.TZ_ENCRYPTION_ALGORITHM;
    const key = process.env.TZ_ENCRYPTION_KEY;
    const iv = process.env.TZ_ENCRYPTION_IV;

    if (!algorithm || !key || !iv) {
        throw new Error("Encryption parameters are missing");
    }

    if (cryptographyProcess === "encryption") {
        return createCipheriv(algorithm, key, iv);
    } else {
        return createDecipheriv(algorithm, key, iv);
    }
}
