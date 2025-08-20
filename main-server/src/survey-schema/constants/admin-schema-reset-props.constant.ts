export const ADMIN_SCHEMA_RESET_PROPS = {
    survey: {
        showQuestionNumbers: "off",
        title: undefined,
        logo: undefined,
        logoWidth: undefined,
        logoHeight: undefined,
        showProgressBar: undefined,
        showCompletedPage: false,
        completedHtml: undefined,
        navigateToUrl: undefined,
        showPageNumbers: false,
        widthMode: "auto",
        completeText: { he: "שמירה" },
    },
    page: {
        maxTimeToFinish: undefined,
        questionsOrder: undefined,
        description: undefined,
    },
} as const;
