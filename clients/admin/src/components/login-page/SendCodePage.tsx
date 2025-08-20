import { type FC } from "react";

import { Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios, { type AxiosError } from "axios";
import * as yup from "yup";

import {
    FormPassword,
    FormProvider,
    FormSubmitButton,
    FormTextInput,
    useAlert,
    useFormConfig,
} from "@hilma/forms";
import { provide } from "@hilma/tools";

import { PASSWORD_REGEX } from "@internal/constants";

import { useI18n, useTranslate } from "../../i18n/i18n-object";

import "./login-page.scss";

const sendCodeSchema = yup.object({
    username: yup
        .string()
        .required("validationText.required|loginPageText.userName|"),
    password: yup
        .string()
        .matches(PASSWORD_REGEX, "validationText.passwordRequirements||")
        .required("validationText.required|loginPageText.password|"),
});

type SendCodeValues = yup.InferType<typeof sendCodeSchema>;
interface InternalSendCodeProps {
    handleCodeSent: (phone: string) => void;
}

const InternalSendCode: FC<InternalSendCodeProps> = ({ handleCodeSent }) => {
    const alert = useAlert();
    const i18n = useI18n((i) => i.loginPageText);
    const translate = useTranslate();
    const sendCodeMutation = useMutation<string, AxiosError, SendCodeValues>({
        mutationKey: ["send-code"],
        mutationFn: async (credentials) => {
            const response = await axios.post(
                "/api/auth/login/send-code",
                credentials,
            );
            return response.data;
        },
        onSuccess: (response) => {
            handleCodeSent(response);
        },
        onError: () => {
            alert(i18n.onErrorMessage);
        },
    });

    const handleSubmit = ({ username, password }: SendCodeValues) => {
        const body = {
            username,
            password,
        };

        sendCodeMutation.mutate(body);
    };
    useFormConfig<SendCodeValues>(
        (form) => {
            form.translateFn = translate;
            form.onSubmit = handleSubmit;
        },
        [translate],
    );

    return (
        <>
            <Typography
                variant="h4"
                color="primary"
            >{`${i18n.userName}:`}</Typography>
            <FormTextInput data-cy="login-username" name="username" />
            <Typography
                variant="h4"
                color="primary"
            >{`${i18n.password}:`}</Typography>
            <FormPassword data-cy="login-password" name="password" />
            <FormSubmitButton
                data-cy="login-submit-button"
                className="form-submit-button"
            >
                <Typography variant="h4" color="background.paper">
                    {i18n.sendVerificationCode}
                </Typography>
            </FormSubmitButton>
        </>
    );
};
export const SendCodePage = provide([
    FormProvider<SendCodeValues>,
    {
        initialValues: {
            username: "",
            password: "",
        },
        onSubmit: () => {
            return;
        },
        validationSchema: sendCodeSchema,
    },
])(InternalSendCode);
