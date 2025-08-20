import type { SendCodeOptions } from "@hilma/auth-mongo-nest";

import { IS_DEVELOPMENT_ENV } from "./is-development-env.constant";

export const sendCodeOptions: SendCodeOptions = {
    sendInEnvironments: ["production"],
    logCode: true,
    code: IS_DEVELOPMENT_ENV ? "111111" : undefined,
    cookieOptions: { httpOnly: true },
};
