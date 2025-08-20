/**
 * Masks object by changing the object's values to `*` of the same length.
 */
export function maskFields(obj: unknown): void {
    if (!obj || typeof obj !== "object") {
        return;
    }

    for (const key in obj) {
        if (key in obj) {
            const objWithUnknownProp = obj as Record<string, unknown>;
            if (typeof objWithUnknownProp[key] === "object") {
                maskFields(objWithUnknownProp[key]);
            } else if (typeof objWithUnknownProp[key] === "string") {
                objWithUnknownProp[key] = "*".repeat(objWithUnknownProp[key].length);
            }
        }
    }
}
