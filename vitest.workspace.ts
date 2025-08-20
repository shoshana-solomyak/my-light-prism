import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
    "main-server",
    "chatbot-server",
    "scripts",
    "clients/*",
    "internal/*",
]);
