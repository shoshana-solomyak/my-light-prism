import { type FC } from "react";
import { useNavigate } from "react-router-dom";

import { Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios, { type AxiosError } from "axios";
import * as yup from "yup";

import { withAuth } from "@hilma/auth-client";
import {
    FormProvider,
    FormSubmitButton,
    FormTextInput,
    useAlert,
    useFormConfig,
} from "@hilma/forms";
import { provide } from "@hilma/tools";

import { CODE_REGEX } from "@internal/constants";

import { useI18n, useTranslate } from "../../i18n/i18n-object";

const confirmCodeSchema = yup.object({
    code: yup
        .string()
        .matches(CODE_REGEX, "validationText.invalidText||")
        .required("validationText.required|loginPageText|"),
});
type ConfirmCodeValues = yup.InferType<typeof confirmCodeSchema>;
interface ConfirmCodeProps {
    phoneNumber: string;
}

const InternalConfirmCode: FC<ConfirmCodeProps> = ({ phoneNumber }) => {
    const alert = useAlert();
    const translate = useTranslate();
    const i18n = useI18n((i) => ({ ...i.confirmCodePage, ...i.validationText }));
    const navigate = useNavigate();
    const confirmCodeMutation = useMutation<void, AxiosError, ConfirmCodeValues>({
        mutationKey: ["confirm-code"],
        mutationFn: async (code) =>
            (await axios.post("/api/auth/login/confirm-code", code)).data,
        onSuccess: () => {
            return navigate("/patients");
        },
        onError: () => {
            alert(i18n.onErrorMessage);
        },
    });

    const handleSubmit = ({ code }: ConfirmCodeValues) => {
        confirmCodeMutation.mutate({ code });
    };
    useFormConfig<ConfirmCodeValues>(
        (form) => {
            form.translateFn = translate;
            form.onSubmit = handleSubmit;
        },
        [translate],
    );
    return (
        <>
            <Typography color="text.disabled" className="code-message-text fade-in">
                <span>{i18n.sendVerificationCode}&nbsp;</span>
                <span dir="ltr">{phoneNumber}</span>
            </Typography>
            <div className="slide-down">
                <Typography variant="h4" color="primary">
                    {i18n.verificationCode}
                </Typography>
                <FormTextInput autoFocus name="code" data-cy="login-code" />
            </div>
            <FormSubmitButton
                data-cy="code-submit-button"
                className="form-submit-button slide-up"
            >
                <Typography variant="h4" color="background.paper">
                    {i18n.submit}
                </Typography>
            </FormSubmitButton>
        </>
    );
};
export const ConfirmCode = withAuth(
    provide([
        FormProvider<ConfirmCodeValues>,
        {
            initialValues: {
                code: "",
            },
            onSubmit: () => {
                //
            },
            validationSchema: confirmCodeSchema,
        },
    ])(InternalConfirmCode),
    { access: "public-only" },
);
