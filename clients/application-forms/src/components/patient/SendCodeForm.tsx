import type { FC } from "react";

import { useMutation } from "@tanstack/react-query";
import axios, { type AxiosError } from "axios";
import dayjs from "dayjs";
import * as yup from "yup";

import {
    FormDateInput,
    FormProvider,
    FormSubmitButton,
    FormTextInput,
    useAlert,
} from "@hilma/forms";

import { useI18n, useTranslate } from "../../i18n/i18n-object";

interface SendCodeFormProps {
    onCodeSent: () => void;
}

interface SendCodeValues {
    tz: string;
    birthDate: Date | string | null;
}

const sendCodeSchema = yup.object({
    tz: yup
        .string()
        .length(9, "validationText.invalidTz||")
        .required("validationText.required||"),
    birthDate: yup.date().required("validationText.required||"),
});

export const SendCodeForm: FC<SendCodeFormProps> = ({ onCodeSent }) => {
    const i18n = useI18n((i) => i.loginText);
    const alert = useAlert();
    const translate = useTranslate();

    const sendCodeMutation = useMutation<string, AxiosError, SendCodeValues>({
        mutationKey: ["patient-send-code"],
        mutationFn: (data) => axios.post("/api/auth/login/patient/send-code", data),
        onSuccess: () => onCodeSent(),
        onError: () => alert(i18n.errorOccurred),
    });
    const handleSubmit = ({ tz, birthDate }: SendCodeValues) => {
        const formattedBirthDate = dayjs(birthDate).format("YYYY-MM-DD");

        sendCodeMutation.mutate({ tz, birthDate: formattedBirthDate });
    };
    return (
        <FormProvider
            validationSchema={sendCodeSchema}
            initialValues={{
                tz: "",
                birthDate: null,
            }}
            onSubmit={handleSubmit}
            translateFn={translate}
            validateOnChange={false}
            validateOnBlur
        >
            <FormTextInput label={i18n.tz} name="tz" />
            <FormDateInput label={i18n.birthDate} name="birthDate" />
            <FormSubmitButton>{i18n.continue}</FormSubmitButton>
        </FormProvider>
    );
};
