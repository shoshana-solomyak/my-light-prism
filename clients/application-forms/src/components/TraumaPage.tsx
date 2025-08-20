import { withAuth } from "@hilma/auth-client";

import { SURVEY_IDS } from "@internal/constants";
import { ROLE } from "@internal/constants";
import { SurveyComponent } from "@internal/survey-ui";

import "./trauma-legends.scss";

const InternalTraumaPage = () => {
    return (
        <SurveyComponent
            surveyId={SURVEY_IDS.patientTraumaForm}
            localLanguage="he"
        />
    );
};
export const TraumaPage = withAuth(InternalTraumaPage, {
    access: "private",
    roles: [ROLE.Patient],
});
