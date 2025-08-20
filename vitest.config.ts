import { defineConfig } from "vitest/config";

/**
 * Shared vitest config
 */
export default defineConfig({
    test: {
        globals: true,
        environment: "node",
    },
});
