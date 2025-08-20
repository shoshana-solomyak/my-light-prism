import { createI18nText } from "../i18n";

export const validationText = createI18nText({
    he: {
        required: "שדה חובה",
        invalidText: "שדה לא חוקי",
        passwordRequirements:
            "הסיסמה חייבת להיות באורך של לפחות 8 תווים, ולכלול לפחות מספר אחד ותו מיוחד אחד.",
    },
});
