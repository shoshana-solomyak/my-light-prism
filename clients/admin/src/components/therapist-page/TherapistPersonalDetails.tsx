import { type FC } from "react";
import { useParams } from "react-router-dom";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { SURVEY_IDS } from "@internal/constants";
import { type InitialData, SurveyComponent } from "@internal/survey-ui";

export const TherapistPersonalDetails: FC = () => {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const { data: personalDetails } = useQuery({
        queryKey: ["therapist", "personal-details", id],
        queryFn: async () =>
            (await axios.get<InitialData>(`/api/therapist/personal-details/${id}`))
                .data,
    });
    const handleSuccess = async () => {
        await queryClient.invalidateQueries({
            queryKey: ["therapist", "personal-details", id],
        });
        await queryClient.invalidateQueries({ queryKey: ["therapist", id] });
    };

    return (
        <SurveyComponent
            localLanguage="he"
            surveyId={SURVEY_IDS.therapistRegister}
            initialData={{ id, data: personalDetails || {} }}
            isAdmin
            onSaveSurveySuccess={handleSuccess}
            displayEditButton
            readOnly
        />
    );
};
