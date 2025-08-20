import { SURVEY_IDS } from "@internal/constants";
import { SurveyComponent } from "@internal/survey-ui";

export default function PatientHistory() {
    return (
        <SurveyComponent surveyId={SURVEY_IDS.patientHistory} localLanguage="he" />
    );
}
