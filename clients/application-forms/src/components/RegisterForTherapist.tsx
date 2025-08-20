import { SURVEY_IDS } from "@internal/constants";
import { SurveyComponent } from "@internal/survey-ui";

import { isValidTz } from "../common/functions/is-valid-tz.function";

export default function RegisterForTherapist() {
    return (
        <SurveyComponent
            surveyId={SURVEY_IDS.therapistRegister}
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
