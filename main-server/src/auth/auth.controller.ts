import { Body, Controller, Get, Inject, Post, Req, Res } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import type { Request, Response } from "express";
import { sendCodeOptions } from "src/common/constants/send-code-options.constant";
import { hidePhoneNumber } from "src/common/functions/hide-phone-number.function";
import { RequestAdminType } from "src/common/types/request-admin.interface";
import { PatientLoginSendCodeDTO } from "src/patient/dto/send-code.dto";

import {
    RequestUser,
    type RequestUserType,
    UseJwtAuth,
    UseKnowledgeAuth,
    UsePossessionAuth,
} from "@hilma/auth-mongo-nest";

import { AuthService } from "./auth.service";
import { JWT_COOKIE_NAME } from "./constants/cookie.constants";
import { ROLES } from "./constants/role.constants";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
    constructor(@Inject(AuthService) private readonly authService: AuthService) {}

    @Post("login/send-code")
    @ApiOperation({
        summary: "Send code to admin.",
        description: "Send verification code as first step in admin 2fa login.",
    })
    @UseKnowledgeAuth({ roles: [ROLES.admin.name] })
    async postLoginSendCode(
        @RequestUser() user: RequestAdminType,
        @Res() res: Response,
    ) {
        const twoFactorData = await this.authService.sendCode({
            user,
            res,
            options: sendCodeOptions,
        });
        res.send(hidePhoneNumber(twoFactorData.phoneNumber));
    }

    @Post("login/confirm-code")
    @UsePossessionAuth({ roles: [ROLES.admin.name] })
    postLoginConfirmCode(
        @RequestUser() requestUser: RequestUserType,
        @Res({ passthrough: true }) res: Response,
    ) {
        return this.authService.loginAndInitialRefreshToken(requestUser, res);
    }

    @Post("login/patient/send-code")
    @ApiOperation({
        summary: "Login as a patient",
        description: "Login to continue filling out patient questionnaire ",
    })
    async postLoginPatientSendCode(
        @Body() body: PatientLoginSendCodeDTO,
        @Res() res: Response,
    ) {
        const phoneNumber = await this.authService.patientLoginSendCode(body, res);
        return res.send(phoneNumber);
    }

    @Post("login/patient/confirm-code")
    @UsePossessionAuth({ roles: [ROLES.patient.name] })
    @ApiOperation({
        summary: "Confirm OTP code for patient login",
        description:
            "Confirm OTP code for patient login. Used on patient's login page",
    })
    postLoginPatientConfirmCode(
        @RequestUser() requestUser: RequestUserType,
        @Res({ passthrough: true }) res: Response,
    ) {
        return this.authService.login(requestUser, res);
    }

    @Get("refresh-token")
    @ApiOperation({
        summary: "Send refresh cookie token to client",
        description:
            "Send cookie token to client. used in the admins AuthProvider (or any user that uses refresh tokens)",
    })
    getRefreshToken(@Req() req: Request) {
        return this.authService.getToken(req);
    }

    @Get("authenticate/admin")
    @ApiOperation({
        summary: "Authenticate user role",
        description: "Authenticate user role. used in the AuthProvider",
    })
    @UseJwtAuth({ roles: [ROLES.admin.name] })
    getAuthenticateAdmin(@RequestUser() user: RequestUserType) {
        return user;
    }

    @Get("jwt-token")
    @ApiOperation({
        summary: "Get patients auth token",
        description: "Get auth patients auth token which isn't a refresh token",
    })
    getJwtToken(@Req() req: Request) {
        const token = req.cookies[JWT_COOKIE_NAME];
        if (!token) return null;
        return { token };
    }

    @Get("authenticate/patient")
    @ApiOperation({
        summary: "Authenticate patient",
        description:
            "Authenticate patient.Used in the application-forms AuthProvider",
    })
    @UseJwtAuth({ roles: [ROLES.patient.name] })
    getAuthenticatePatient(@RequestUser() user: RequestUserType) {
        return user;
    }

    @Get("refresh")
    @ApiOperation({
        summary: "Refresh Token",
        description:
            "Get refresh token. used when the existing access token expires ",
    })
    getRefresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        return this.authService.getRefresh(req, res);
    }

    @Post("logout")
    @UseJwtAuth()
    postLogout(@Res({ passthrough: true }) res: Response) {
        return this.authService.logout(res);
    }
}
