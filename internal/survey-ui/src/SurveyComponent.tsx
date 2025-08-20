import { type FC, useEffect, useRef, useState } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { type AxiosError } from "axios";
import { FunctionFactory, Model, surveyLocalization } from "survey-core";
import "survey-core/defaultV2.min.css";
import "survey-core/i18n/hebrew";
import { Survey } from "survey-react-ui";

import { useAlert } from "@hilma/forms";

import { surveyTheme } from "@internal/constants";
import type { SurveyId } from "@internal/types";

import "./survey-utils/initialize-serializer";

//Initializes custom serializer properties.

type FunctionToRegister = Parameters<
    (typeof FunctionFactory.Instance)["register"]
>[1];

export type InitialData = { id: unknown } & { data: Object };

interface SurveyComponentProps {
    surveyId: SurveyId;
    initialData?: InitialData;
    functionsToRegister?: {
        name: string;
        func: FunctionToRegister;
    }[];
    isAdmin?: boolean;
    theme?: object;
    readOnly?: boolean;
    displayEditButton?: boolean;
    localLanguage: string;
    onSaveSurveySuccess?: (() => void) | (() => Promise<void>);
}

export const SurveyComponent: FC<SurveyComponentProps> = ({
    surveyId,
    initialData,
    functionsToRegister,
    isAdmin,
    localLanguage,
    onSaveSurveySuccess,
    theme,
    readOnly,
    displayEditButton,
}) => {
    surveyLocalization.defaultLocale = localLanguage;

    const showAlert = useAlert();

    const [isEditing, setIsEditing] = useState(!readOnly);
    const showEditButton = readOnly && displayEditButton;
    const openPanels = useRef<string[]>([]);

    // Register the functions for this survey
    functionsToRegister?.forEach(({ name, func }) => {
        FunctionFactory.Instance.register(name, func);
    });

    const { data: surveyJson } = useQuery<Object, AxiosError>({
        queryKey: ["survey-schema", surveyId, isAdmin && "admin"],
        queryFn: async () =>
            (
                await axios.get<Object>(`/api/survey-schema/${surveyId}`, {
                    params: { isAdmin },
                })
            ).data,
    });

    const survey = new Model(surveyJson || {});
    survey.mode = isEditing ? "edit" : "display";
    survey.applyTheme(theme || surveyTheme);

    useEffect(() => {
        survey.setVariable("isadmin", isAdmin || false);
    }, [survey]);

    // Load initial data into the survey
    if (initialData) survey.data = initialData.data;

    const initialSurveyData = JSON.stringify(survey.data);
    let isChanged = false;

    survey.onValueChanged.add(() => {
        isChanged = JSON.stringify(survey.data) !== initialSurveyData;
    });

    survey.onAfterRenderQuestion.add((_, options) => {
        const question = options.question;
        const questionEl = options.htmlElement;

        //Style read only input fields differently
        if (question.isReadOnly) {
            const inputElement = questionEl.querySelector(
                "input, textarea",
            ) as HTMLElement;
            if (inputElement) {
                inputElement.style.color = "#a4a4a4";
                inputElement.style.backgroundColor = "#f7f7f7";
                inputElement.style.cursor = "not-allowed";
            }
        }
    });

    // Add edit button
    const heTranslations = surveyLocalization.getLocaleStrings("he");
    heTranslations.editPage = "עריכה"; //Todo: move to i18n
    survey.addNavigationItem({
        id: "sv-nav-edit-survey",
        locTitleName: "editPage",
        action: () => {
            handleFindOpenPanels();
            setIsEditing(true);
        },
        css: !isEditing && showEditButton ? "" : "sv-action--hidden",
        innerCss: "sd-btn sd-btn--action sd-navigation__com",
    });

    // Function to store open panels when survey mode changes
    const handleFindOpenPanels = () => {
        const allPanels = survey.getAllPanels();

        const openPanelNames = allPanels
            .filter((panel) => {
                return panel.isExpanded;
            })
            .map((panel) => panel.name);

        openPanels.current = openPanelNames;
    };

    // Function to restore open panels after mode change
    useEffect(() => {
        openPanels.current.forEach((panelName) => {
            const panel = survey.getPanelByName(panelName);
            if (panel) {
                panel.expand();
            }
        });
        openPanels.current = [];
    }, [isEditing]);

    const saveSurveyMutation = useMutation<void, AxiosError, Object>({
        mutationKey: ["save-survey"],
        mutationFn: (data) => axios.post("/api/survey-handler/submit", data),
        onError: () => {
            alert("error");
        },
        onSuccess: async () => {
            if (onSaveSurveySuccess) await onSaveSurveySuccess();
            setIsEditing(false);
        },
    });

    const handleComplete = (sender: Model, options: { allowComplete: boolean }) => {
        if (!isChanged) {
            options.allowComplete = false;
            showAlert(
                "לא בוצעו שינויים. אנא עדכן לפחות שדה אחד לפני השליחה.", //Todo: move to i18n
                "info",
            );
            return;
        }
        handleFindOpenPanels();

        // If changes were made, allow completion and proceed with saving
        saveSurveyMutation.mutate({
            surveyData: sender.data,
            id: initialData?.id,
            surveyId,
        });
    };

    survey.onCompleting.add(handleComplete);

    // TODO: skeleton
    return <Survey model={survey} />;
};
