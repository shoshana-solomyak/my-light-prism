import { createLegendHtml } from "src/survey-schema/functions/create-trauma-survey-rating-legends-html.function";

import {
    FULL_NAME_REGEX,
    MOBILE_ONLY_PHONE_NUMBER_REGEX,
    SURVEY_ACTIONS,
} from "@internal/constants";
import type { SurveyId } from "@internal/types";

import {
    LEGENDS_OPTIONS_FOR_ANXIETY_PAGE,
    LEGENDS_OPTIONS_FOR_DEPRESSION_PAGE,
    LEGENDS_OPTIONS_FOR_FUNCTIONING_PAGE,
} from "../survey-schema/constants/rating-legends.constant";
import { SURVEY_LOGO } from "./logo.constant";

export const SURVEY_JSONS: Record<SurveyId, Object> = {
    "patient-personal-details": {
        locale: "he",
        title: { he: "שאלון פניה לטיפול" },
        logo: SURVEY_LOGO,
        logoWidth: "100px",
        logoHeight: "100px",
        pages: [
            {
                name: "personalDetailsPage",
                elements: [
                    {
                        type: "text",
                        name: "firstName",
                        title: { he: "שם פרטי" },
                        isRequired: true,
                        validators: [
                            {
                                type: "text",
                                minLength: 2,
                                text: {
                                    he: "על השם להיות באורך של 2 תווים או יותר",
                                },
                            },
                        ],
                    },
                    {
                        type: "text",
                        name: "lastName",
                        title: { he: "שם משפחה" },
                        isRequired: true,
                        validators: [
                            {
                                type: "text",
                                minLength: 2,
                                text: {
                                    he: "על השם להיות באורך של 2 תווים או יותר",
                                },
                            },
                        ],
                    },
                    {
                        type: "text",
                        name: "tz",
                        title: { he: "תעודת זהות" },
                        isRequired: true,
                        validators: [
                            {
                                type: "expression",
                                expression: "isValidTz({tz})",
                                text: { he: "מספר תעודת הזהות אינו חוקי" },
                            },
                        ],
                        inputType: "text",
                        enableIf: "!{isadmin}",
                    },
                    {
                        type: "text",
                        name: "birthDate",
                        title: { he: "תאריך לידה" },
                        isRequired: true,
                        inputType: "date",
                        validators: [
                            {
                                type: "expression",
                                expression: "{birthDate} < today()",
                                text: { he: "תאריך הלידה צריך להיות בעבר" },
                            },
                        ],
                        enableIf: "!{isadmin}",
                    },
                    {
                        type: "radiogroup",
                        name: "gender",
                        title: { he: "מגדר" },
                        isRequired: true,
                        choices: [
                            { value: "male", text: { he: "זכר" } },
                            { value: "female", text: { he: "נקבה" } },
                            { value: "other", text: { he: "אחר" } },
                        ],
                    },
                    {
                        type: "text",
                        name: "phoneNumber",
                        title: { he: "מספר טלפון" },
                        isRequired: true,
                        validators: [
                            {
                                type: "regex",
                                text: { he: "מספר הטלפון אינו חוקי" },
                                regex: String(
                                    MOBILE_ONLY_PHONE_NUMBER_REGEX,
                                ).replaceAll("/", ""),
                            },
                        ],
                    },
                    {
                        type: "text",
                        name: "verifyPhoneNumber",
                        title: { he: "אימות מספר טלפון" },
                        isRequired: true,
                        validators: [
                            {
                                type: "expression",
                                text: { he: "מספר הטלפון לא תואם" },
                                expression: "{phoneNumber} == {verifyPhoneNumber}",
                            },
                        ],
                    },
                    {
                        type: "text",
                        name: "mail",
                        title: { he: "דואר אלקטרוני" },
                        isRequired: true,
                        validators: [
                            {
                                type: "email",
                                text: { he: "כתובת המייל אינה חוקית" },
                            },
                        ],
                    },
                    // City question
                    {
                        type: "text",
                        name: "street",
                        title: { he: "רחוב" },
                        isRequired: true,
                    },
                ],
                title: { he: "פרטי הפונה לטיפול\n" },
            },
            {
                name: "reasonPage",
                elements: [
                    {
                        type: "comment",
                        name: "reason",
                        title: {
                            he: "כתוב בקצרה אודות סיבת הפניה, אם ישנו אירוע או תאריך מסויים, אנא ציין זאת",
                        },
                        isRequired: true,
                    },
                ],
                title: { he: "\nסיבת הפניה" },
            },
            {
                name: "contactPage",
                elements: [
                    {
                        type: "boolean",
                        name: "addContact",
                        title: { he: "האם תרצה להוסיף פרטי איש קשר נוסף?" },
                        isRequired: true,
                        labelTrue: "כן",
                        labelFalse: "לא",
                    },
                    {
                        type: "panel",
                        name: "contactDetails",
                        elements: [
                            {
                                type: "text",
                                name: "contactFullName",
                                title: { he: "שם מלא של איש הקשר הנוסף" },
                                isRequired: true,
                                validators: [
                                    {
                                        type: "regex",
                                        text: { he: "אנא מלא שם פרטי ושם משפחה" },
                                        regex: String(FULL_NAME_REGEX).replaceAll(
                                            "/",
                                            "",
                                        ),
                                    },
                                ],
                            },
                            {
                                type: "dropdown",
                                name: "contactRelation",
                                title: { he: "קרבה למטופל" },
                                isRequired: true,
                                choices: [
                                    {
                                        value: "parent",
                                        text: { he: "אמא/אבא" },
                                    },
                                ],
                                showOtherItem: true,
                                otherText: { he: "אחר" },
                                placeholder: { he: "בחירה" },
                            },
                            {
                                type: "text",
                                name: "contactPhoneNumber",
                                title: { he: "מספר טלפון" },
                                isRequired: true,
                                validators: [
                                    {
                                        type: "regex",
                                        text: { he: "מספר הטלפון אינו חוקי" },
                                        regex: String(
                                            MOBILE_ONLY_PHONE_NUMBER_REGEX,
                                        ).replaceAll("/", ""),
                                    },
                                ],
                            },
                            {
                                type: "text",
                                name: "contactMail",
                                title: { he: "דואר אלקטרוני" },
                                isRequired: true,
                                validators: [
                                    {
                                        type: "email",
                                        text: { he: "כתובת המייל אינה חוקית" },
                                    },
                                ],
                            },
                        ],
                        visibleIf: "{addContact} = true",
                    },
                ],
                title: { he: "פרטי איש קשר" },
            },
        ],
        questionErrorLocation: "bottom",
        checkErrorsMode: "onValueChanged",
        showQuestionNumbers: "off",
        actionType: SURVEY_ACTIONS.savePatient,
    },
    "therapist-register": {
        locale: "he",
        title: {
            he: "הרשמת מטפל",
        },
        pages: [
            {
                name: "פרטים אישיים",
                elements: [
                    {
                        type: "text",
                        name: "phoneNumber",
                        title: { he: "מספר טלפון" },
                        isRequired: true,
                        inputType: "tel",
                        validators: [
                            {
                                type: "regex",
                                text: { he: "מספר הטלפון אינו חוקי" },
                                regex: String(
                                    MOBILE_ONLY_PHONE_NUMBER_REGEX,
                                ).replaceAll("/", ""),
                            },
                        ],
                    },
                    {
                        type: "panel",
                        name: "details",
                        elements: [
                            {
                                type: "text",
                                name: "firstName",
                                title: {
                                    he: "שם פרטי",
                                },
                                isRequired: true,
                                validators: [
                                    {
                                        type: "text",
                                        minLength: 2,
                                        text: {
                                            he: "על השם להיות באורך של 2 תווים או יותר",
                                        },
                                    },
                                ],
                            },
                            {
                                type: "text",
                                name: "lastName",
                                startWithNewLine: false,
                                title: {
                                    he: "שם משפחה",
                                },
                                isRequired: true,
                                validators: [
                                    {
                                        type: "text",
                                        minLength: 2,
                                        text: {
                                            he: "על השם להיות באורך של 2 תווים או יותר",
                                        },
                                    },
                                ],
                            },
                            {
                                type: "text",
                                name: "birthDate",
                                title: {
                                    he: "תאריך לידה",
                                },
                                isRequired: true,
                                validators: [
                                    {
                                        type: "expression",
                                        expression: "{birthDate} < today()",
                                        text: { he: "תאריך הלידה צריך להיות בעבר" },
                                    },
                                ],
                                inputType: "date",
                                enableIf: "!{isadmin}",
                            },
                            {
                                type: "text",
                                name: "tz",
                                startWithNewLine: false,
                                title: {
                                    he: "תעודת זהות",
                                },
                                validators: [
                                    {
                                        type: "expression",
                                        expression: "isValidTz({tz})",
                                        text: { he: "מספר תעודת הזהות אינו חוקי" },
                                    },
                                ],
                                isRequired: true,
                                enableIf: "!{isadmin}",
                            },
                            {
                                type: "radiogroup",
                                name: "gender",
                                title: {
                                    he: "מגדר",
                                },
                                isRequired: true,
                                choices: [
                                    {
                                        value: "male",
                                        text: {
                                            he: "גבר",
                                        },
                                    },
                                    {
                                        value: "female",
                                        text: {
                                            he: "אישה",
                                        },
                                    },
                                    {
                                        value: "other",
                                        text: {
                                            he: "אחר",
                                        },
                                    },
                                ],
                            },
                            {
                                type: "radiogroup",
                                name: "sector",
                                title: {
                                    he: "מגזר",
                                },
                                isRequired: true,
                                choices: [
                                    {
                                        value: "general",
                                        text: {
                                            he: "כללי",
                                        },
                                    },
                                    {
                                        value: "religious",
                                        text: {
                                            he: "דתי",
                                        },
                                    },
                                    {
                                        value: "orthodox",
                                        text: {
                                            he: "חרדי",
                                        },
                                    },
                                ],
                            },
                        ],
                        title: {
                            he: "פרטים",
                        },
                    },
                    {
                        type: "checkbox",
                        name: "languages",
                        title: {
                            he: "שליטה בשפות",
                        },
                        description: {
                            he: "ניתן לבחור מספר אפשרויות",
                        },
                        isRequired: true,
                        choices: [
                            {
                                value: "hebrew",
                                text: {
                                    he: "עברית",
                                },
                            },
                            {
                                value: "english",
                                text: {
                                    he: "אנגלית",
                                },
                            },
                            {
                                value: "russian",
                                text: {
                                    he: "רוסית",
                                },
                            },
                            {
                                value: "arabic",
                                text: {
                                    he: "ערבית",
                                },
                            },
                            {
                                value: "french",
                                text: {
                                    he: "צרפתית",
                                },
                            },
                            {
                                value: "spanish",
                                text: {
                                    he: "ספרדית",
                                },
                            },
                            {
                                value: "amharic",
                                text: {
                                    he: "אמהרית",
                                },
                            },
                            {
                                value: "other",
                                text: {
                                    he: "אחר",
                                },
                            },
                        ],
                        colCount: 5,
                    },
                    {
                        type: "radiogroup",
                        name: "treatmentOption",
                        title: {
                            he: "אפשרות טיפול",
                        },
                        isRequired: true,
                        choices: [
                            {
                                value: "zoom",
                                text: {
                                    he: "זום",
                                },
                            },
                            {
                                value: "frontal",
                                text: {
                                    he: "פרונטלי",
                                },
                            },
                            {
                                value: "bothOptions",
                                text: {
                                    he: "שתי האפשרויות",
                                },
                            },
                        ],
                    },
                ],
            },
            {
                name: "הכשרה מקצועית",
                elements: [
                    {
                        type: "checkbox",
                        name: "vocationalTrainings",
                        title: {
                            he: "הכשרה מקצועית",
                        },
                        description: {
                            he: "ניתן לבחור מספר אפשרויות",
                        },
                        isRequired: true,
                        choices: [
                            {
                                value: "clinicPsychoAndTraumaExpert",
                                text: {
                                    he: "מומחה/ית בפסיכולוגיה קלינית + התמחות בשיטות טיפול בטראומה",
                                },
                            },
                            {
                                value: "socialWorkerMasterAndTrauma",
                                text: {
                                    he: 'עו"ס קליני/ת בעל/ת תואר שני + התמחות בשיטות טיפול בטראומה',
                                },
                            },
                            {
                                value: "threeYearPsychotherapySchool",
                                text: {
                                    he: 'בוגר/ת בי"ס תלת שנתי לפסיכותרפיה',
                                },
                            },
                            {
                                value: "expressive",
                                text: {
                                    he: "תואר שני בהבעה ויצירה + מומחיות בשיטות טיפול בטראומה",
                                },
                            },
                            {
                                value: "animals",
                                text: {
                                    he: "מטפל בבעלי חיים",
                                },
                            },
                            "CBT",
                            "EMDR",
                        ],
                    },
                    {
                        type: "checkbox",
                        name: "specializationTypes",
                        title: {
                            he: "מה סוגי ההתמחות שלך?",
                        },
                        description: {
                            he: "ניתן לבחור מספר אפשרויות",
                        },
                        isRequired: true,
                        choices: [
                            {
                                value: "individual",
                                text: {
                                    he: "פרטני",
                                },
                            },
                            {
                                value: "couple",
                                text: {
                                    he: "זוגי",
                                },
                            },
                            {
                                value: "family",
                                text: {
                                    he: "משפחתי",
                                },
                            },
                            {
                                value: "group",
                                text: {
                                    he: "קבוצתי",
                                },
                            },
                            {
                                value: "psychiatrist",
                                text: {
                                    he: "פסיכיאטר",
                                },
                            },
                            {
                                value: "animals",
                                text: {
                                    he: "טיפול בבעלי חיים",
                                },
                            },
                            {
                                value: "art",
                                text: {
                                    he: "טיפול באומנות",
                                },
                            },
                            {
                                value: "music",
                                text: {
                                    he: "טיפול במוזיקה",
                                },
                            },
                            "NPL",
                            "CBT",
                            {
                                value: "horses",
                                text: {
                                    he: "רכיבה על סוסים",
                                },
                            },
                        ],
                    },
                    {
                        type: "checkbox",
                        name: "specializationAges",
                        title: {
                            he: "התמחות בגילאים",
                        },
                        description: {
                            he: "ניתן לבחור מספר אפשרויות",
                        },
                        isRequired: true,
                        choices: [
                            { value: "oneToFive", text: "1-5" },
                            { value: "fiveToTwelve", text: "5-12" },
                            { value: "twelveToEighteen", text: "12-18" },
                            { value: "eighteenToSixtyFive", text: "18-65" },
                            { value: "sixtyFivePlus", text: "+65" },
                        ],
                    },
                    {
                        type: "checkbox",
                        name: "traumaExperiences",
                        title: {
                            he: "ידע וניסיון בטיפול בטראומה",
                        },
                        description: {
                            he: "ניתן לבחור מספר אפשרויות",
                        },
                        isRequired: true,
                        choices: [
                            "CBT",
                            "EMDR",
                            {
                                value: "focusedTechniquesTraumaTreatment",
                                text: {
                                    he: "ידע וניסיון בשימוש בטכניקות ממוקדות בטיפול בטראומה",
                                },
                            },
                            {
                                value: "groupsExperience",
                                text: {
                                    he: "ניסיון בהתערבויות קבוצתיות וטיפול קבוצתי",
                                },
                            },
                            "SE",
                            {
                                value: "postTraumaticExperience",
                                text: {
                                    he: "ניסיון בעבודה עם פוסט טראומתיים",
                                },
                            },
                            {
                                value: "postTraumaticTeenagersExperience",
                                text: {
                                    he: "ידע וניסיון בטיפול בטראומה במתבגרים ובמבוגרים",
                                },
                            },
                            {
                                value: "postTraumaticKidsTrauma",
                                text: {
                                    he: "התמחות בטיפול בטראומה בילדים",
                                },
                            },
                        ],
                    },
                    {
                        type: "comment",
                        name: "traumaCareExperience",
                        title: {
                            he: "נשמח לפירוט אודות הנסיון שלך בטיפול בטראומה",
                        },
                        description: {
                            he: "באיזו מסגרת צברת נסיון בטראומה? באילו כלים? ומתי?",
                        },
                        isRequired: true,
                        placeholder: {
                            he: "יש לכתוב כאן..",
                        },
                    },
                    {
                        type: "radiogroup",
                        name: "numberOfPatientsAWeek",
                        title: {
                            he: "מה מספר המטפלים אליו תוכל/י להתחייב?",
                        },
                        isRequired: true,
                        choices: [
                            {
                                value: "upToFive",
                                text: {
                                    he: "עד 5 מטופלים בשבוע",
                                },
                            },
                            {
                                value: "upToTen",
                                text: {
                                    he: "עד 10 מטופלים בשבוע",
                                },
                            },
                            {
                                value: "upToFifteen",
                                text: {
                                    he: "עד 15 מטופלים בשבוע",
                                },
                            },
                        ],
                    },
                    {
                        type: "radiogroup",
                        name: "yearsOfExperience",
                        title: {
                            he: "כמה שנות ותק בטיפול בטראומה יש לך?",
                        },
                        isRequired: true,
                        choices: [
                            {
                                value: "zeroToFour",
                                text: {
                                    he: "0-4 שנים",
                                },
                            },
                            {
                                value: "fourToEight",
                                text: {
                                    he: "4-8 שנים",
                                },
                            },
                            {
                                value: "eightPlus",
                                text: {
                                    he: "8 שנים ומעלה",
                                },
                            },
                        ],
                    },
                    {
                        type: "paneldynamic",
                        name: "daysAvailable",
                        title: {
                            he: "ציין באילו ימים ושעות תוכל לטפל",
                        },
                        minPanelCount: 1,
                        maxPanelCount: 7,
                        panelAddText: "הוספת יום",
                        panelRemoveText: "הסר",
                        templateElements: [
                            {
                                type: "panel",
                                name: "availableDay",
                                isRequired: true,
                                elements: [
                                    {
                                        type: "dropdown",
                                        name: "day",
                                        title: {
                                            he: "יום",
                                        },
                                        isRequired: true,
                                        choices: [
                                            {
                                                value: "sunday",
                                                text: {
                                                    he: "ראשון",
                                                },
                                            },
                                            {
                                                value: "monday",
                                                text: {
                                                    he: "שני",
                                                },
                                            },
                                            {
                                                value: "tuesday",
                                                text: {
                                                    he: "שלישי",
                                                },
                                            },
                                            {
                                                value: "wednesday",
                                                text: {
                                                    he: "רביעי",
                                                },
                                            },
                                            {
                                                value: "thursday",
                                                text: {
                                                    he: "חמישי",
                                                },
                                            },
                                            {
                                                value: "friday",
                                                text: {
                                                    he: "שישי",
                                                },
                                            },
                                            {
                                                value: "saturday",
                                                text: {
                                                    he: "שבת",
                                                },
                                            },
                                        ],
                                        placeholder: "בחר..",
                                    },
                                    {
                                        type: "text",
                                        name: "from",
                                        title: {
                                            he: "מהשעה",
                                        },
                                        isRequired: true,
                                        inputType: "time",
                                    },
                                    {
                                        type: "text",
                                        name: "until",
                                        startWithNewLine: false,
                                        title: {
                                            he: "עד",
                                        },
                                        isRequired: true,
                                        inputType: "time",
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],

        questionErrorLocation: "bottom",
        checkErrorsMode: "onValueChanged",
        showQuestionNumbers: "off",
        widthMode: "static",
        actionType: SURVEY_ACTIONS.createTherapist,
    },
    "patient-trauma-form": {
        actionType: SURVEY_ACTIONS.traumaResponse,
        locale: "he",
        title: {
            he: "שאלון מצב אישי",
        },
        pages: [
            {
                name: "anxiety-page",
                title: { he: "שאלון חרדה" },
                description: {
                    he: "בשאלון זה יש רשימת סימפטומים של חרדה.\n קרא/י בקפידה כל פריט ברשימה וסמן/י עד כמה היית מוטרד/ת מכל סימפטום וסימפטום במהלך השבוע האחרון.",
                },
                elements: [
                    {
                        type: "html",
                        name: "anxiety-legends",
                        html: createLegendHtml(LEGENDS_OPTIONS_FOR_ANXIETY_PAGE),
                    },
                    {
                        startWithNewLine: true,
                        type: "rating",
                        name: "anxiety1",
                        title: {
                            he: "חוסר תחושה או תחושת עקצוץ",
                        },
                        isRequired: true,
                        autoGenerate: false,
                        rateCount: 4,
                        rateValues: [
                            { value: 0 },
                            { value: 1 },
                            { value: 2 },
                            { value: 3 },
                        ],
                    },
                    {
                        type: "rating",
                        name: "anxiety2",
                        title: {
                            he: "הרגשת חום",
                        },
                        isRequired: true,
                        autoGenerate: false,
                        rateCount: 4,
                        rateValues: [
                            { value: 0 },
                            { value: 1 },
                            { value: 2 },
                            { value: 3 },
                        ],
                    },

                    {
                        type: "rating",
                        name: "anxiety3",
                        title: {
                            he: "נענוע ברגלים",
                        },
                        isRequired: true,
                        autoGenerate: false,
                        rateCount: 4,
                        rateValues: [
                            { value: 0 },
                            { value: 1 },
                            { value: 2 },
                            { value: 3 },
                        ],
                    },
                    {
                        type: "rating",
                        name: "anxiety4",
                        title: {
                            he: "חוסר יכולת להירגע",
                        },
                        isRequired: true,
                        autoGenerate: false,
                        rateCount: 4,
                        rateValues: [
                            { value: 0 },
                            { value: 1 },
                            { value: 2 },
                            { value: 3 },
                        ],
                    },
                    {
                        type: "rating",
                        name: "anxiety5",
                        title: {
                            he: "פחד שהגרוע מכל יקרה",
                        },
                        isRequired: true,
                        autoGenerate: false,
                        rateCount: 4,
                        rateValues: [
                            { value: 0 },
                            { value: 1 },
                            { value: 2 },
                            { value: 3 },
                        ],
                    },
                    {
                        type: "rating",
                        name: "anxiety6",
                        title: {
                            he: "סחרחורת או קלות ראש",
                        },
                        isRequired: true,
                        autoGenerate: false,
                        rateCount: 4,
                        rateValues: [
                            { value: 0 },
                            { value: 1 },
                            { value: 2 },
                            { value: 3 },
                        ],
                    },
                    {
                        type: "rating",
                        name: "anxiety7",
                        title: {
                            he: "הלמות לב או קצב לב מהיר",
                        },
                        isRequired: true,
                        autoGenerate: false,
                        rateCount: 4,
                        rateValues: [
                            { value: 0 },
                            { value: 1 },
                            { value: 2 },
                            { value: 3 },
                        ],
                    },
                    {
                        type: "rating",
                        name: "anxiety8",
                        title: {
                            he: "חוסר יציבות",
                        },
                        isRequired: true,
                        autoGenerate: false,
                        rateCount: 4,
                        rateValues: [
                            { value: 0 },
                            { value: 1 },
                            { value: 2 },
                            { value: 3 },
                        ],
                    },
                    {
                        type: "rating",
                        name: "anxiety9",
                        title: {
                            he: "מפוחד, תחושת אימה",
                        },
                        isRequired: true,
                        autoGenerate: false,
                        rateCount: 4,
                        rateValues: [
                            { value: 0 },
                            { value: 1 },
                            { value: 2 },
                            { value: 3 },
                        ],
                    },
                    {
                        type: "rating",
                        name: "anxiety10",
                        title: {
                            he: "עצבני",
                        },
                        isRequired: true,
                        autoGenerate: false,
                        rateCount: 4,
                        rateValues: [
                            { value: 0 },
                            { value: 1 },
                            { value: 2 },
                            { value: 3 },
                        ],
                    },
                    {
                        type: "rating",
                        name: "anxiety11",
                        title: {
                            he: "תחושת מחנק",
                        },
                        isRequired: true,
                        autoGenerate: false,
                        rateCount: 4,
                        rateValues: [
                            { value: 0 },
                            { value: 1 },
                            { value: 2 },
                            { value: 3 },
                        ],
                    },
                    {
                        type: "rating",
                        name: "anxiety12",
                        title: {
                            he: "רעד בידיים",
                        },
                        isRequired: true,
                        autoGenerate: false,
                        rateCount: 4,
                        rateValues: [
                            { value: 0 },
                            { value: 1 },
                            { value: 2 },
                            { value: 3 },
                        ],
                    },
                    {
                        type: "rating",
                        name: "anxiety13",
                        title: {
                            he: "חוסר יציבות",
                        },
                        isRequired: true,
                        autoGenerate: false,
                        rateCount: 4,
                        rateValues: [
                            { value: 0 },
                            { value: 1 },
                            { value: 2 },
                            { value: 3 },
                        ],
                    },
                    {
                        type: "rating",
                        name: "anxiety14",
                        title: {
                            he: "פחד מאיבוד שליטה",
                        },
                        isRequired: true,
                        autoGenerate: false,
                        rateCount: 4,
                        rateValues: [
                            { value: 0 },
                            { value: 1 },
                            { value: 2 },
                            { value: 3 },
                        ],
                    },
                    {
                        type: "rating",
                        name: "anxiety15",
                        title: {
                            he: "קושי בנשימה ",
                        },
                        isRequired: true,
                        autoGenerate: false,
                        rateCount: 4,
                        rateValues: [
                            { value: 0 },
                            { value: 1 },
                            { value: 2 },
                            { value: 3 },
                        ],
                    },
                    {
                        type: "rating",
                        name: "anxiety16",
                        title: {
                            he: "פחד ממוות",
                        },
                        isRequired: true,
                        autoGenerate: false,
                        rateCount: 4,
                        rateValues: [
                            { value: 0 },
                            { value: 1 },
                            { value: 2 },
                            { value: 3 },
                        ],
                    },
                    {
                        type: "rating",
                        name: "anxiety17",
                        title: {
                            he: "פחד ",
                        },
                        isRequired: true,
                        autoGenerate: false,
                        rateCount: 4,
                        rateValues: [
                            { value: 0 },
                            { value: 1 },
                            { value: 2 },
                            { value: 3 },
                        ],
                    },
                    {
                        type: "rating",
                        name: "anxiety18",
                        title: {
                            he: "הפרעות עיכול או חוסר נוחות בבטן ",
                        },
                        isRequired: true,
                        autoGenerate: false,
                        rateCount: 4,
                        rateValues: [
                            { value: 0 },
                            { value: 1 },
                            { value: 2 },
                            { value: 3 },
                        ],
                    },
                    {
                        type: "rating",
                        name: "anxiety19",
                        title: {
                            he: "תשוש /רפה/חלש",
                        },
                        isRequired: true,
                        autoGenerate: false,
                        rateCount: 4,
                        rateValues: [
                            { value: 0 },
                            { value: 1 },
                            { value: 2 },
                            { value: 3 },
                        ],
                    },
                    {
                        type: "rating",
                        name: "anxiety20",
                        title: {
                            he: "הסמקה בפנים",
                        },
                        isRequired: true,
                        autoGenerate: false,
                        rateCount: 4,
                        rateValues: [
                            { value: 0 },
                            { value: 1 },
                            { value: 2 },
                            { value: 3 },
                        ],
                    },
                    {
                        type: "rating",
                        name: "anxiety21",
                        title: {
                            he: "הזעה (לא בגלל חום)",
                        },
                        isRequired: true,
                        autoGenerate: false,
                        rateCount: 4,
                        rateValues: [
                            { value: 0 },
                            { value: 1 },
                            { value: 2 },
                            { value: 3 },
                        ],
                    },
                ],
            },
            {
                name: "depression-page",
                title: { he: "שאלון דיכאון" },
                description: {
                    he: "על כל פריט הנך מתבקש להעריך באיזה תדירות היית מוטרד מההיגד המתואר במהלך השבועיים האחרונים.",
                },
                elements: [
                    {
                        type: "html",
                        name: "depression-legends",
                        html: createLegendHtml(LEGENDS_OPTIONS_FOR_DEPRESSION_PAGE),
                    },
                    {
                        startWithNewLine: true,
                        type: "rating",
                        name: "depression1",
                        title: {
                            he: "עניין או הנאה מועטים מעשיית דברים ",
                        },
                        isRequired: true,
                        autoGenerate: false,
                        rateCount: 4,
                        rateValues: [
                            { value: 0 },
                            { value: 1 },
                            { value: 2 },
                            { value: 3 },
                        ],
                    },
                    {
                        type: "rating",
                        name: "depression2",
                        title: {
                            he: "תחושת דכדוך, דיכאון או חוסר תקווה ",
                        },
                        isRequired: true,
                        autoGenerate: false,
                        rateCount: 4,
                        rateValues: [
                            { value: 0 },
                            { value: 1 },
                            { value: 2 },
                            { value: 3 },
                        ],
                    },
                    {
                        type: "rating",
                        name: "depression3",
                        title: {
                            he: "קשיים בהירדמות, או בשינה רציפה, או עודף שינה ",
                        },
                        isRequired: true,
                        autoGenerate: false,
                        rateCount: 4,
                        rateValues: [
                            { value: 0 },
                            { value: 1 },
                            { value: 2 },
                            { value: 3 },
                        ],
                    },
                    {
                        type: "rating",
                        name: "depression4",
                        title: {
                            he: "תחושה של עייפות או אנרגיה מועטה",
                        },
                        isRequired: true,
                        autoGenerate: false,
                        rateCount: 4,
                        rateValues: [
                            { value: 0 },
                            { value: 1 },
                            { value: 2 },
                            { value: 3 },
                        ],
                    },
                    {
                        type: "rating",
                        name: "depression5",
                        title: {
                            he: "תיאבון מועט או אכילת יתר",
                        },
                        isRequired: true,
                        autoGenerate: false,
                        rateCount: 4,
                        rateValues: [
                            { value: 0 },
                            { value: 1 },
                            { value: 2 },
                            { value: 3 },
                        ],
                    },
                    {
                        type: "rating",
                        name: "depression6",
                        title: {
                            he: "מרגישה רע לגבי עצמך – מרגישה שאת כישלון או שאיכזבת את עצמך או את משפחתך",
                        },
                        isRequired: true,
                        autoGenerate: false,
                        rateCount: 4,
                        rateValues: [
                            { value: 0 },
                            { value: 1 },
                            { value: 2 },
                            { value: 3 },
                        ],
                    },
                    {
                        type: "rating",
                        name: "depression7",
                        title: {
                            he: "קשה להתרכז בדברים, כמו קריאה בעיתון או צפיה בטלוויזיה",
                        },
                        isRequired: true,
                        autoGenerate: false,
                        rateCount: 4,
                        rateValues: [
                            { value: 0 },
                            { value: 1 },
                            { value: 2 },
                            { value: 3 },
                        ],
                    },
                    {
                        type: "rating",
                        name: "depression8",
                        title: {
                            he: "היית מדברת או נעה באיטיות עד כדי כך שאחרים הבחינו בכך, או להיפך, היית חסרת שקט ומנוחה כך שהיית צריכה להסתובב יותר מהרגיל",
                        },
                        isRequired: true,
                        autoGenerate: false,
                        rateCount: 4,
                        rateValues: [
                            { value: 0 },
                            { value: 1 },
                            { value: 2 },
                            { value: 3 },
                        ],
                    },
                    {
                        type: "rating",
                        name: "depression9",
                        title: {
                            he: "מחשבות שהיה עדיף לו היית מתה או מחשבות על פגיעה בעצמך בדרך כלשהי",
                        },
                        isRequired: true,
                        autoGenerate: false,
                        rateCount: 4,
                        rateValues: [
                            { value: 0 },
                            { value: 1 },
                            { value: 2 },
                            { value: 3 },
                        ],
                    },
                    {
                        type: "rating",
                        name: "depression10",
                        title: {
                            he: "אם סימנת בעיות כלשהן, אנא סמני עד כמה בעיות אלו הקשו עלייך לבצע את עבודתך, לטפל בדברים בבית, או להסתדר עם אנשים אחרים",
                        },
                        isRequired: true,
                        autoGenerate: false,
                        rateCount: 4,
                        rateValues: [
                            { value: 0 },
                            { value: 1 },
                            { value: 2 },
                            { value: 3 },
                        ],
                    },
                ],
            },
            {
                name: "functioning-page",
                title: { he: "שאלון תפקוד" },
                description: {
                    he: 'אנא סמן לגבי כל משפט באיזו מידה הרגשת כך בחודש האחרון באמצעות דירוג בין 0-6, במידה והפריט אינו רלוונטי עבורך, ניתן לסמן "לא רלוונטי".',
                },
                elements: [
                    {
                        type: "html",
                        name: "functioning-legends",
                        html: createLegendHtml(LEGENDS_OPTIONS_FOR_FUNCTIONING_PAGE),
                    },
                    {
                        startWithNewLine: true,
                        type: "panel",
                        name: "functioning_panel1",
                        elements: [
                            {
                                type: "rating",
                                name: "functioning1",
                                title: {
                                    he: "היה לי קושי לטפל בעצמי (עבודות בית, טיפול רפואי, פעילות גופנית ופעילויות פנאי) ",
                                },
                                resetValueIf:
                                    "{functioning_irrelevant1} allof ['Irrelevant']",
                                requiredIf: "{functioning_irrelevant1} empty",
                                rateCount: 7,
                                rateMin: 0,
                                rateMax: 6,
                            },
                            {
                                type: "checkbox",
                                name: "functioning_irrelevant1",
                                title: {
                                    he: " \n",
                                },
                                resetValueIf: "{functioning1} notempty",
                                choices: [
                                    {
                                        value: "Irrelevant",
                                        text: {
                                            he: "לא רלוונטי",
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: "panel",
                        name: "functioning_panel2",
                        elements: [
                            {
                                type: "rating",
                                name: "functioning2",
                                title: {
                                    he: "היה לי קושי במערכת היחסים הרומנטית שלי (עם בן.ת הזוג שלי) ",
                                },
                                resetValueIf:
                                    "{functioning_irrelevant2} allof ['Irrelevant']",
                                requiredIf: "{functioning_irrelevant2} empty",
                                rateCount: 7,
                                rateMin: 0,
                                rateMax: 6,
                            },
                            {
                                type: "checkbox",
                                name: "functioning_irrelevant2",
                                title: {
                                    he: " \n",
                                },
                                resetValueIf: "{functioning2} notempty",
                                choices: [
                                    {
                                        value: "Irrelevant",
                                        text: {
                                            he: "לא רלוונטי",
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: "panel",
                        name: "functioning_panel3",
                        elements: [
                            {
                                type: "rating",
                                name: "functioning3",
                                title: {
                                    he: "היה לי קושי ביחסים שלי עם ילדי",
                                },
                                resetValueIf:
                                    "{functioning_irrelevant3} allof ['Irrelevant']",
                                requiredIf: "{functioning_irrelevant3} empty",
                                rateCount: 7,
                                rateMin: 0,
                                rateMax: 6,
                            },
                            {
                                type: "checkbox",
                                name: "functioning_irrelevant3",
                                title: {
                                    he: " \n",
                                },
                                resetValueIf: "{functioning3} notempty",
                                choices: [
                                    {
                                        value: "Irrelevant",
                                        text: {
                                            he: "לא רלוונטי",
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: "panel",
                        name: "functioning_panel4",
                        elements: [
                            {
                                type: "rating",
                                name: "functioning4",
                                title: {
                                    he: "היה לי קושי עם המשפחה המורחבת שלי (לא כולל בן.ת זוג וילדים) ",
                                },
                                resetValueIf:
                                    "{functioning_irrelevant4} allof ['Irrelevant']",
                                requiredIf: "{functioning_irrelevant4} empty",
                                rateCount: 7,
                                rateMin: 0,
                                rateMax: 6,
                            },
                            {
                                type: "checkbox",
                                name: "functioning_irrelevant4",
                                title: {
                                    he: " \n",
                                },
                                resetValueIf: "{functioning4} notempty",
                                choices: [
                                    {
                                        value: "Irrelevant",
                                        text: {
                                            he: "לא רלוונטי",
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: "panel",
                        name: "functioning_panel5",
                        elements: [
                            {
                                type: "rating",
                                name: "functioning5",
                                title: {
                                    he: "היה לי קושי בעבודה ",
                                },
                                resetValueIf:
                                    "{functioning_irrelevant5} allof ['Irrelevant']",
                                requiredIf: "{functioning_irrelevant5} empty",
                                rateCount: 7,
                                rateMin: 0,
                                rateMax: 6,
                            },
                            {
                                type: "checkbox",
                                name: "functioning_irrelevant5",
                                title: {
                                    he: " \n",
                                },
                                resetValueIf: "{functioning5} notempty",
                                choices: [
                                    {
                                        value: "Irrelevant",
                                        text: {
                                            he: "לא רלוונטי",
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: "panel",
                        name: "functioning_panel6",
                        elements: [
                            {
                                type: "rating",
                                name: "question41",
                                title: {
                                    he: "היה לי קושי עם החברים שלי ובמצבים חברתיים",
                                },
                                resetValueIf:
                                    "{functioning_irrelevant6} allof ['Irrelevant']",
                                requiredIf: "{functioning_irrelevant6} empty",
                                rateCount: 7,
                                rateMin: 0,
                                rateMax: 6,
                            },
                            {
                                type: "checkbox",
                                name: "functioning_irrelevant6",
                                title: {
                                    he: " \n",
                                },
                                resetValueIf: "{question41} notempty",
                                choices: [
                                    {
                                        value: "Irrelevant",
                                        text: {
                                            he: "לא רלוונטי",
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: "panel",
                        name: "functioning_panel7",
                        elements: [
                            {
                                type: "rating",
                                name: "functioning7",
                                title: {
                                    he: "היה לי קושי בלימודים",
                                },
                                resetValueIf:
                                    "{functioning_irrelevant7} allof ['Irrelevant']",
                                requiredIf: "{functioning_irrelevant7} empty",
                                rateCount: 7,
                                rateMin: 0,
                                rateMax: 6,
                            },
                            {
                                type: "checkbox",
                                name: "functioning_irrelevant7",
                                title: {
                                    he: " \n",
                                },
                                resetValueIf: "{functioning7} notempty",
                                choices: [
                                    {
                                        value: "Irrelevant",
                                        text: {
                                            he: "לא רלוונטי",
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                name: "addiction-page",
                title: { he: "שאלון התמכרות" },
                description: {
                    he: "אנא סמן את התשובות בהתאם למצבך\n",
                },
                elements: [
                    {
                        type: "radiogroup",
                        name: "addiction",
                        title: {
                            he: "האם את מתמודדת עם התמכרות כלשהי? \n",
                        },
                        choices: [
                            {
                                value: "true",
                                text: {
                                    he: "כן",
                                },
                            },
                            {
                                value: "false",
                                text: {
                                    he: "לא",
                                },
                            },
                        ],
                    },
                ],
            },
        ],
        showQuestionNumbers: "off",
    },
    "patient-history": {
        locale: "he",
        title: "שאלון הסטוריה אישית",
        logo: SURVEY_LOGO,
        logoWidth: "100px",
        logoHeight: "100px",
        pages: [
            {
                name: "additionalDetails",
                title: "פרטים אישיים",
                elements: [
                    {
                        type: "text",
                        name: "nativeLand",
                        title: "ארץ לידה",
                        isRequired: true,
                    },
                    {
                        type: "text",
                        name: "dateOfImmigration",
                        title: "תאריך עליה",
                        inputType: "date",
                    },
                    {
                        type: "dropdown",
                        name: "maritalStatus",
                        title: "מצב משפחתי",
                        isRequired: true,
                        choices: [
                            {
                                value: "married",
                                text: {
                                    he: "נשוי",
                                },
                            },
                            {
                                value: "single",
                                text: {
                                    he: "רווק",
                                },
                            },
                            {
                                value: "separated",
                                text: {
                                    he: "פרוד",
                                },
                            },
                            {
                                value: "divorced",
                                text: {
                                    he: "גרוש",
                                },
                            },
                            {
                                value: "widow",
                                text: {
                                    he: "אלמן",
                                },
                            },
                        ],
                    },
                    {
                        type: "text",
                        name: "occupation",
                        title: "עיסוק",
                        isRequired: true,
                    },
                    {
                        type: "text",
                        name: "workplaceOrStudies",
                        title: "מקום עבודה / לימודים",
                    },
                ],
            },
            {
                name: "treatmentHistory",
                title: {
                    he: "הסטורית המטופל",
                },
                elements: [
                    {
                        type: "radiogroup",
                        name: "hasReceivedTreatment",
                        title: {
                            he: "האם נעזרת בעבר בגורמי טיפול/סיוע?",
                        },
                        isRequired: true,
                        choices: [
                            {
                                value: "yes",
                                text: {
                                    he: "כן",
                                },
                            },
                            {
                                value: "no",
                                text: {
                                    he: "לא",
                                },
                            },
                        ],
                    },
                    {
                        type: "tagbox",
                        name: "pastTreatmentLocation",
                        visibleIf: "{hasReceivedTreatment} = 'yes'",
                        title: {
                            he: "מה היה סוג הטיפול/סיוע?",
                        },
                        isRequired: true,
                        choices: [
                            {
                                value: "resilienceCenter",
                                text: {
                                    he: "מרכז חוסן",
                                },
                            },
                            {
                                value: "healthMaintenanceOrg",
                                text: {
                                    he: "טיפול דרך קופת חולים",
                                },
                            },
                            {
                                value: "private",
                                text: {
                                    he: "טיפול פרטי",
                                },
                            },
                            {
                                value: "mentalHealthClinic",
                                text: {
                                    he: "מרפאה לבריאות הנפש",
                                },
                            },
                            {
                                value: "socialServicesDepartment",
                                text: {
                                    he: "המחלקה לשירותים חברתיים",
                                },
                            },
                            {
                                value: "other",
                                text: {
                                    he: "אחר",
                                },
                            },
                        ],
                    },
                    {
                        type: "radiogroup",
                        name: "isReceivingTreatmentInPresent",
                        title: {
                            he: "האם כיום יש גורם טיפול/סיוע נוסף?",
                        },
                        choices: [
                            {
                                value: "yes",
                                text: {
                                    he: "כן",
                                },
                            },
                            {
                                value: "no",
                                text: {
                                    he: "לא",
                                },
                            },
                        ],
                    },
                    {
                        type: "tagbox",
                        name: "presentTreatmentLocation",
                        visibleIf: "{isReceivingTreatmentInPresent} = 'yes'",
                        title: {
                            he: "מה היה סוג הטיפול/סיוע?",
                        },
                        isRequired: true,
                        choices: [
                            {
                                value: "resilienceCenter",
                                text: {
                                    he: "מרכז חוסן",
                                },
                            },
                            {
                                value: "healthMaintenanceOrg",
                                text: {
                                    he: "טיפול דרך קופת חולים",
                                },
                            },
                            {
                                value: "private",
                                text: {
                                    he: "טיפול פרטי",
                                },
                            },
                            {
                                value: "mentalHealthClinic",
                                text: {
                                    he: "מרפאה לבריאות הנפש",
                                },
                            },
                            {
                                value: "socialServicesDepartment",
                                text: {
                                    he: "המחלקה לשירותים חברתיים",
                                },
                            },
                            {
                                value: "other",
                                text: {
                                    he: "אחר",
                                },
                            },
                        ],
                    },
                    {
                        type: "tagbox",
                        name: "diagnosis",
                        title: {
                            he: "סמן אם אובחנת על ידי גורם מוסמך באחד או יותר מהאבחנות הבאות",
                        },
                        choices: [
                            {
                                value: "ADHD",
                                text: {
                                    he: "קשב וריכוז",
                                },
                            },
                            {
                                value: "postTrauma",
                                text: {
                                    he: "פוסט טראומה",
                                },
                            },
                            {
                                value: "depression",
                                text: {
                                    he: "דיכאון",
                                },
                            },
                            {
                                value: "behavioralDisorders",
                                text: {
                                    he: "הפרעת התנהגות",
                                },
                            },
                            {
                                value: "other",
                                text: {
                                    he: "אחר",
                                },
                            },
                        ],
                    },
                    {
                        type: "radiogroup",
                        name: "isTakingMedication",
                        title: {
                            he: "האם נוטל תרופות באופן קבוע?",
                        },
                        isRequired: true,
                        choices: [
                            {
                                value: "yes",
                                text: {
                                    he: "כן",
                                },
                            },
                            {
                                value: "no",
                                text: {
                                    he: "לא",
                                },
                            },
                        ],
                    },
                    {
                        type: "text",
                        name: "prescriptions",
                        visibleIf: "{isTakingMedication} = 'yes'",
                        title: {
                            he: "איזה תרופות",
                        },
                        isRequired: true,
                    },
                    {
                        type: "radiogroup",
                        name: "hasRequestedNationalInsuranceRecognition",
                        title: {
                            he: 'האם הוגשה בקשה להכרה ע"י הביטוח הלאומי כנפגע פעולות איבה?',
                        },
                        isRequired: true,
                        choices: [
                            {
                                value: "yes",
                                text: {
                                    he: "כן",
                                },
                            },
                            {
                                value: "no",
                                text: {
                                    he: "לא",
                                },
                            },
                        ],
                    },
                    {
                        type: "radiogroup",
                        name: "nationalInsuranceRequestStatus",
                        visibleIf:
                            "{hasRequestedNationalInsuranceRecognition} = 'yes'",
                        title: {
                            he: "מה סטטוס הבקשה?",
                        },
                        isRequired: true,
                        choices: [
                            {
                                value: "inProgress",
                                text: {
                                    he: "בטיפול",
                                },
                            },
                            {
                                value: "approved",
                                text: {
                                    he: "אושרה",
                                },
                            },
                            {
                                value: "rejected",
                                text: {
                                    he: "נדחתה",
                                },
                            },
                        ],
                    },
                    {
                        type: "text",
                        name: "nationalInsuranceApprovedPercentage",
                        title: {
                            he: "אם הוגדרת עם אחוזי נכות איבה, כמה אחוזי נכות?",
                        },
                        inputType: "number",
                        visibleIf: "{nationalInsuranceRequestStatus} = 'approved'",
                    },
                    {
                        type: "dropdown",
                        name: "healthMaintenanceOrg",
                        title: {
                            he: "באיזו קופת חולים אתה מטופל?",
                        },
                        isRequired: true,
                        choices: [
                            {
                                value: "clalit",
                                text: {
                                    he: "בללית",
                                },
                            },
                            {
                                value: "meuhedet",
                                text: {
                                    he: "מאוחדת",
                                },
                            },
                            {
                                value: "maccabi",
                                text: {
                                    he: "מכבי",
                                },
                            },
                            {
                                value: "leumit",
                                text: {
                                    he: "לאומית",
                                },
                            },
                        ],
                    },
                ],
            },
            {
                name: "requests",
                title: {
                    he: "בקשות מיוחדות",
                },
                elements: [
                    {
                        type: "tagbox",
                        name: "PreferredLanguage",
                        title: {
                            he: "שפת הטיפול המועדפת",
                        },
                        description: {
                            he: " ניתן לבחור מספר שפות",
                        },
                        isRequired: true,
                        choices: [
                            {
                                value: "hebrew",
                                text: {
                                    he: "עברית",
                                },
                            },
                            {
                                value: "english",
                                text: {
                                    he: "אנגלית",
                                },
                            },
                            {
                                value: "russian",
                                text: {
                                    he: "רוסית",
                                },
                            },
                            {
                                value: "arabic",
                                text: {
                                    he: "ערבית",
                                },
                            },
                            {
                                value: "french",
                                text: {
                                    he: "צרפתית",
                                },
                            },
                            {
                                value: "spanish",
                                text: {
                                    he: "ספרדית",
                                },
                            },
                            {
                                value: "amharic",
                                text: {
                                    he: "אמהרית",
                                },
                            },
                        ],
                    },
                    {
                        type: "tagbox",
                        name: "requestedTreatmentType",
                        title: {
                            he: "סוג הטיפול המבוקש",
                        },
                        description: {
                            he: "במידה וישנה העדפה, מהו סוג הטיפול שתרצו?",
                        },
                        choices: [
                            {
                                value: "individual",
                                text: {
                                    he: "טיפול פרטני",
                                },
                            },
                            {
                                value: "couple",
                                text: {
                                    he: "טיפול זוגי",
                                },
                            },
                            {
                                value: "family",
                                text: {
                                    he: "טיפול משפחתי",
                                },
                            },
                            {
                                value: "group",
                                text: {
                                    he: "טיפול קבוצתי",
                                },
                            },
                            {
                                value: "unknown",
                                text: {
                                    he: "לא ידוע",
                                },
                            },
                        ],
                    },
                    {
                        type: "radiogroup",
                        name: "preferredTreatmentLocation",
                        visibleIf:
                            "{treatmentTypeRequested} = 'individual' or {treatmentTypeRequested} = 'group'",
                        title: {
                            he: "איפה נח לקבל טיפול?",
                        },
                        choices: [
                            {
                                value: "zoom",
                                text: {
                                    he: "זום",
                                },
                            },
                            {
                                value: "frontal",
                                text: {
                                    he: "פרונטלי",
                                },
                            },
                        ],
                    },
                    {
                        type: "radiogroup",
                        name: "hasTherapistGenderPreference",
                        title: {
                            he: "האם ישנה העדפה למטפל ממגדר מסויים?",
                        },
                        isRequired: true,
                        choices: [
                            {
                                value: "yes",
                                text: {
                                    he: "כן",
                                },
                            },
                            {
                                value: "no",
                                text: {
                                    he: "לא",
                                },
                            },
                        ],
                    },
                    {
                        type: "radiogroup",
                        name: "isPreferredTherapistGender",
                        title: {
                            he: "איזה מגדר מטפל תעדיפו?",
                        },
                        visibleIf: "{hasTherapistGenderPreference} = 'yes'",
                        isRequired: true,
                        choices: [
                            {
                                value: "male",
                                text: {
                                    he: "זכר",
                                },
                            },
                            {
                                value: "female",
                                text: {
                                    he: "נקבה",
                                },
                            },
                        ],
                    },
                    {
                        type: "radiogroup",
                        name: "preferSameGenderTherapist",
                        title: {
                            he: "האם ישנה העדפה למטפל מהמגזר שלך?",
                        },
                        isRequired: true,
                        choices: [
                            {
                                value: "yes",
                                text: {
                                    he: "כן",
                                },
                            },
                            {
                                value: "no",
                                text: {
                                    he: "לא",
                                },
                            },
                        ],
                    },
                ],
            },
        ],
        showQuestionNumbers: "off",
    },
};
