import { SURVEY_IDS } from "@internal/constants";
import { SurveyComponent } from "@internal/survey-ui";

import { isValidTz } from "../common/functions/is-valid-tz.function";

export default function Details() {
    return (
        <SurveyComponent
            surveyId={SURVEY_IDS.patientPersonalDetails}
            localLanguage="he"
            functionsToRegister={[
                {
                    name: "isValidTz",
                    func: (params) => {
                        const [tz] = params;
                        return isValidTz(String(tz));
                    },
                },
            ]}
        />
    );
}
