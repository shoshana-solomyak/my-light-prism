/**
 * `process.env.NODE_ENV` is "test"
 */
export const IS_TEST_ENV = process.env.NODE_ENV === "test";

/**
 * `process.env.NODE_ENV` is "development" (or "test")
 *
 * Use this variable for turning off external API connections in dev environments
 */
export const IS_DEVELOPMENT_ENV =
    process.env.NODE_ENV === "development" || IS_TEST_ENV;
