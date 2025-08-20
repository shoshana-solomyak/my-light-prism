import { type FC, useState } from "react";

import { Typography } from "@mui/material";

import { withAuth } from "@hilma/auth-client";

import { useI18n } from "../../i18n/i18n-object";
import { ConfirmCode } from "./ConfirmCode";
import { SendCodePage } from "./SendCodePage";

import "./login-page.scss";

const RAYS_OF_LIGHT_LOGO = "/images/rays-of-light-logo.svg";
enum LoginSteps {
    SendCode = "SEND_CODE",
    ConfirmCode = "CONFIRM_CODE",
}

const InternalLoginPage: FC = () => {
    const [currentLoginStep, setCurrentLoginStep] = useState<LoginSteps>(
        LoginSteps.SendCode,
    );
    const [phoneNumber, setPhoneNumber] = useState<string>("");

    const i18n = useI18n((i) => i.loginPageText);

    const onCodeSend = (phone: string) => {
        setCurrentLoginStep(LoginSteps.ConfirmCode);
        setPhoneNumber(phone);
    };

    return (
        <div className="login-page">
            <div className="title-card">
                <p className="rays-of-light-title">
                    <img
                        className="rays-of-light-logo"
                        src={RAYS_OF_LIGHT_LOGO}
                        alt="rays of light logo"
                    />
                </p>
            </div>
            <div className="login-card">
                <div className="login-container">
                    <div className="login-inner-container">
                        <div className="title-container">
                            <Typography
                                color="secondary"
                                variant="h1"
                                className="login-title"
                            >
                                {i18n.login}
                            </Typography>
                            <Typography variant="h2" color="secondary">
                                {i18n.toCenterManagement}
                            </Typography>
                        </div>
                        {currentLoginStep === LoginSteps.SendCode ? (
                            <SendCodePage handleCodeSent={onCodeSend} />
                        ) : (
                            <ConfirmCode phoneNumber={phoneNumber} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export const LoginPage = withAuth(InternalLoginPage, { access: "public-only" });
