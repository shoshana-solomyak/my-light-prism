import { type FC } from "react";
import { useParams } from "react-router-dom";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { SURVEY_IDS } from "@internal/constants";
import { SurveyComponent } from "@internal/survey-ui";

export const PatientPersonalDetails: FC = () => {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const { data: personalDetails } = useQuery({
        queryKey: ["patient", "personal-details", id],
        queryFn: async () =>
            (await axios.get<Object>(`/api/patient/personal-details/${id}`)).data,
    });

    const handleSurveySuccess = async () => {
        await queryClient.invalidateQueries({
            queryKey: ["patient", "personal-details", id],
        });
        await queryClient.invalidateQueries({
            queryKey: ["patient", id],
        });
    };
    return (
        <>
            <SurveyComponent
                surveyId={SURVEY_IDS.patientPersonalDetails}
                initialData={{ id, data: personalDetails || {} }}
                localLanguage="he"
                isAdmin
                readOnly
                displayEditButton
                onSaveSurveySuccess={handleSurveySuccess}
            />
        </>
    );
};
