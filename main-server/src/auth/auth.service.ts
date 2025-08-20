import {
    HttpException,
    Inject,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";

import { Request, Response } from "express";
import { IS_DEVELOPMENT_ENV } from "src/common/constants/is-development-env.constant";
import { sendCodeOptions } from "src/common/constants/send-code-options.constant";
import { hidePhoneNumber } from "src/common/functions/hide-phone-number.function";
import { PatientLoginSendCodeDTO } from "src/patient/dto/send-code.dto";
import { PatientService } from "src/patient/patient.service";

import {
    RefreshTokenService,
    RequestUserType,
    SendCodeOptions,
    TwoFactorService,
    UserService,
} from "@hilma/auth-mongo-nest";

import { AuthToken } from "@internal/types";

import { JWT_COOKIE_NAME, REFRESH_COOKIE_NAME } from "./constants/cookie.constants";

@Injectable()
export class AuthService {
    constructor(
        private readonly twoFactorService: TwoFactorService,
        @Inject(UserService) private readonly userService: UserService,
        private readonly refreshTokenService: RefreshTokenService,
        @Inject(PatientService.name)
        private readonly patientService: PatientService,
    ) {}

    sendCode({
        user,
        res,
        options,
    }: {
        user: RequestUserType;
        res: Response;
        options?: SendCodeOptions;
    }) {
        return this.twoFactorService.sendCode(user, res, options);
    }

    getToken(req: Request) {
        const cookieName = REFRESH_COOKIE_NAME;
        if (!cookieName) return null;
        const token: AuthToken = req.cookies[cookieName];
        if (!token) return null;
        return { token };
    }

    loginAndInitialRefreshToken(requestUser: RequestUserType, res: Response) {
        this.userService.login(requestUser, res, undefined, {
            httpOnly: true,
            secure: IS_DEVELOPMENT_ENV,
            sameSite: "lax",
        });
        return this.refreshTokenService.addInitialRefreshToken(requestUser, res, {
            httpOnly: true,
            secure: IS_DEVELOPMENT_ENV,
            sameSite: "lax",
        });
    }

    getRefresh(req: Request, res: Response) {
        return this.refreshTokenService.rotateRefreshToken(
            req.cookies[REFRESH_COOKIE_NAME],
            res,
            undefined,
            {
                httpOnly: true,
                secure: IS_DEVELOPMENT_ENV,
                sameSite: "lax",
            },
        );
    }

    logout(res: Response) {
        res.clearCookie(JWT_COOKIE_NAME);
        res.clearCookie(REFRESH_COOKIE_NAME);
    }

    async patientLoginSendCode(body: PatientLoginSendCodeDTO, res: Response) {
        try {
            const requestUser = await this.patientService.getRequestUserData(body);

            const { username, phoneNumber } = requestUser;
            // Validate the user
            await this.userService.validateUser(username);
            await this.twoFactorService.validateUser(phoneNumber);

            //Send code
            await this.twoFactorService.sendCode(requestUser, res, sendCodeOptions);
            return hidePhoneNumber(phoneNumber);
        } catch (err) {
            if (err instanceof HttpException) throw err;

            throw new UnauthorizedException();
        }
    }

    login(requestUser: RequestUserType, res: Response) {
        return this.userService.login(requestUser, res);
    }
}
