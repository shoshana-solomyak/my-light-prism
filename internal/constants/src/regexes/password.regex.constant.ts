/**
 * Be at least 8 characters long.
 * Contain at least one digit (0–9).
 * Contain at least one special character from the set @$!%*?&.
 */
export const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[@$!%*?&]).{8,}$/;
