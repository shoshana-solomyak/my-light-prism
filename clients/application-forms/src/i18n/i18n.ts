import { createTextFunctions } from "@hilma/i18n";

export enum Language {
    /** @knipignore */
    He = "he",
}

export const { createI18n, createI18nText } = createTextFunctions(Language);
