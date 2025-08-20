import { createI18nText } from "../i18n";

export const patientPageText = createI18nText({
    he: {
        patients: "מטופלים",
        tabs: {
            applicationDashboard: "ניהול פניה",
            personalDetails: "פרטים אישיים",
            traumaDashboard: "שאלון טראומה",
        },
        applicationDashboard: {
            assignmentSuggestions: "הצעות לשיבוץ",
            therapistName: "שם המטפל",
            compatibilityPercentage: "אחוז התאמה",
            compatibilityReasons: "סיבות להתאמה",
        },
        traumaDashboard: {
            surveyNotFilled: "המטופל לא מילא את שאלון הטראומה",
            fillInForm: "מילוי שאלון",
        },
        personalDetails: {
            edit: "עריכה",
        },
    },
});
