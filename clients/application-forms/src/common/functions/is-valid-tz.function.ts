/**
 * Checks if the given tz is valid.
 *
 * @param {string} tz - The users tz number.
 */
export function isValidTz(tz: string) {
    if (!tz || tz.length !== 9 || isNaN(Number(tz))) {
        // Make sure tz is formatted properly
        return false;
    }

    let sum = 0;
    for (let i = 0; i < tz.length; i++) {
        const incNum = Number(tz[i]) * ((i % 2) + 1); // Multiply number by 1 or 2
        sum += incNum > 9 ? incNum - 9 : incNum; // Sum the digits up and add to total
    }

    return sum % 10 === 0;
}
