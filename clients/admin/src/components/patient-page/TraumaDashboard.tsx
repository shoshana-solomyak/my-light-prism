import { type FC, useState } from "react";
import { useParams } from "react-router-dom";

import { Button, Typography } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { SURVEY_IDS } from "@internal/constants";
import { type InitialData, SurveyComponent } from "@internal/survey-ui";

import { useI18n } from "../../i18n/i18n-object";

import "../../style/trauma-dashboard.scss";
import "./trauma-legends.scss";

const NO_TRAUMA_RESPONSE = "/public/images/no-data.svg";
//Todo: remove double file

export const TraumaDashboard: FC = () => {
    const queryClient = useQueryClient();
    const i18n = useI18n((i) => i.patientPageText.traumaDashboard);
    const [showEmptyForm, setShowEmptyForm] = useState(false);
    const { id } = useParams();
    const { data: traumaResponse } = useQuery({
        queryKey: ["patient", "trauma-response", id],
        queryFn: async () =>
            (await axios.get<InitialData>(`/api/patient/trauma-response/${id}`))
                .data,
    });

    function handleShowForm() {
        setShowEmptyForm(true);
    }

    return (
        <>
            {showEmptyForm || traumaResponse ? (
                <SurveyComponent
                    surveyId={SURVEY_IDS.patientTraumaForm}
                    localLanguage="he"
                    initialData={{ data: traumaResponse || {}, id }}
                    isAdmin
                    readOnly={Boolean(traumaResponse)}
                    onSaveSurveySuccess={() =>
                        queryClient.invalidateQueries({
                            queryKey: ["patient", "trauma-response", id],
                        })
                    }
                />
            ) : (
                <div className="no-data-container">
                    <img className="no-data-img" src={NO_TRAUMA_RESPONSE} />
                    <Typography variant="h1">{i18n.surveyNotFilled}</Typography>
                    <Button className="fill-in-form" onClick={handleShowForm}>
                        {i18n.fillInForm}
                    </Button>
                </div>
            )}
        </>
    );
};
