import { type AuthConfig } from "@hilma/auth-mongo-nest";

import {
    JWT_COOKIE_NAME,
    REFRESH_COOKIE_NAME,
    TWO_FACTOR_COOKIE_NAME,
} from "./auth/constants/cookie.constants";
import { ROLES } from "./auth/constants/role.constants";

export function loadAuthConfig(): AuthConfig {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("Failed to find JWT_SECRET in env");
    const twoFactorSecretOrKey = process.env.TWO_FACTOR_SECRET;
    if (!twoFactorSecretOrKey)
        throw new Error("Failed to get TWO_FACTOR_SECRET from env");

    const pass019 = process.env.TOKEN_019 ?? process.env.PASS_019;
    if (!pass019) {
        throw new Error("Failed to get pass019 from env");
    }

    const refreshSecretOrKey = process.env.REFRESH_SECRET;
    if (!refreshSecretOrKey) throw new Error("Failed to find REFRESH_SECRET in env");
    return {
        auth: {
            accessTokenCookie: JWT_COOKIE_NAME,
            secretOrKey: secret,
            twoFactorSecretOrKey,
            twoFactorTokenCookie: TWO_FACTOR_COOKIE_NAME,
            secretPass019: { password: pass019, passwordIsToken: true },
            extraTokenFields: ["phoneNumber", "healthcareCenterId"],
            refreshTokenCookie: REFRESH_COOKIE_NAME,
            refreshSecretOrKey,
            ttl: {
                [ROLES.admin.name]: 60 * 60 * 15,
            },
        },
    };
}
