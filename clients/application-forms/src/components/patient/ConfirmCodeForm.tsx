import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";
import axios, { type AxiosError } from "axios";
import * as yup from "yup";

import {
    FormProvider,
    FormSubmitButton,
    FormTextInput,
    useAlert,
} from "@hilma/forms";

import { useI18n, useTranslate } from "../../i18n/i18n-object";

const confirmCodeSchema = yup.object({
    code: yup.string().required("validationText.required||"),
});
type ConfirmCodeValues = yup.InferType<typeof confirmCodeSchema>;

export const ConfirmCodeForm = () => {
    const i18n = useI18n((i) => i.loginText);
    const navigate = useNavigate();
    const alert = useAlert();
    const translate = useTranslate();

    const confirmCodeMutation = useMutation<void, AxiosError, ConfirmCodeValues>({
        mutationKey: ["login-confirm-code"],
        async mutationFn(code) {
            await axios.post(`/api/auth/login/patient/confirm-code`, code);
        },
        onSuccess() {
            void navigate("/patient/trauma");
        },
        onError() {
            alert(i18n.errorOccurred);
        },
    });

    const handleSubmit = (code: ConfirmCodeValues) => {
        confirmCodeMutation.mutate(code);
    };
    return (
        <FormProvider
            initialValues={{
                code: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={confirmCodeSchema}
            translateFn={translate}
        >
            <FormTextInput name="code" label={i18n.code} />
            <FormSubmitButton>{i18n.continue}</FormSubmitButton>
        </FormProvider>
    );
};
