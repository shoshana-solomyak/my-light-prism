import { createI18nHooksAndProvider } from "@hilma/i18n";

import { Language, createI18n } from "./i18n";
import * as texts from "./texts";

const i18n = createI18n({ ...texts });
const hooksAndProvider = createI18nHooksAndProvider(Language, i18n);
export const { I18nProvider, createI18nHook, createTranslateHook } =
    hooksAndProvider;

type I18n = typeof i18n;
export const useI18n = createI18nHook<I18n>();

export const useTranslate = createTranslateHook<I18n>();
