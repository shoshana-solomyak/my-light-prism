/**
 * Hides the phone number by replacing 5 digits with asterisks.
 * @param phoneNumber Phone number to hide
 * @returns The modified phone number with middle digits hidden.
 */
export function hidePhoneNumber(phoneNumber?: string | never | unknown): string {
    if (typeof phoneNumber !== "string" || !phoneNumber) return "";
    return `${phoneNumber.slice(0, 2)}${"*".repeat(5)}${phoneNumber.slice(6, 10)}`;
}
