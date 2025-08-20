import { BadRequestException, Inject, Injectable } from "@nestjs/common";

import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { encryptTz } from "src/functions/encrypt-tz.function";
import { CreatePatientDto } from "src/patient/dto/create-patient.dto";
import { UpdatePatientDto } from "src/patient/dto/update-patient.dto";
import { UpdateTherapistDto } from "src/patient/dto/update-therapist-dto";
import { PatientService } from "src/patient/patient.service";
import { TherapistRegisterDto } from "src/therapist/dto/create-therapist.dto";
import { TherapistService } from "src/therapist/therapist.service";

import { SURVEY_ACTIONS } from "@internal/constants";
import { SurveyAction } from "@internal/types";

@Injectable()
export class SurveyHandlerService {
    constructor(
        @Inject(PatientService.name)
        private readonly patientService: PatientService,
        @Inject(TherapistService.name)
        private readonly therapistService: TherapistService,
    ) {}

    async saveSurvey(
        surveyAction: SurveyAction,
        surveyData: Record<string, unknown>,
        id?: string,
    ) {
        if (surveyAction === SURVEY_ACTIONS.savePatient) {
            if (id) {
                const updatePatientDto = plainToInstance(UpdatePatientDto, {
                    patientDetailsResponse: surveyData,
                });

                // Validate the data
                const errors = await validate(updatePatientDto);
                if (errors.length > 0) throw new BadRequestException(errors);

                const { patientDetailsResponse: patientDetails } = updatePatientDto;

                if (!patientDetails) throw new BadRequestException("No valid data");

                // eslint-disable-next-line no-unused-vars -- because we need to save the patient details without the tz
                const { tz, ...patientDetailsWithoutTz } = patientDetails;

                return this.patientService.updatePatientSurveyResponse(id, {
                    patientDetailsResponse: patientDetailsWithoutTz,
                });
            } else {
                const patientToCreate = plainToInstance(CreatePatientDto, {
                    tz: encryptTz(String(surveyData.tz)),
                    phoneNumber: surveyData.phoneNumber,
                    firstName: surveyData.firstName,
                    lastName: surveyData.lastName,
                    birthDate: surveyData.birthDate,
                    patientDetailsResponse: surveyData,
                    healthcareCenterId: "678f965b4daacc6eac544ca7", //TODO remove hardcoded
                });

                // Validate the data
                const errors = await validate(patientToCreate);
                if (errors.length > 0) throw new BadRequestException(errors);

                return this.patientService.createPatient(patientToCreate);
            }
        } else if (surveyAction === SURVEY_ACTIONS.createTherapist) {
            if (id) {
                const updateTherapistDto = plainToInstance(UpdateTherapistDto, {
                    therapistDetailsResponse: surveyData,
                });

                // Validate the data
                const errors = await validate(updateTherapistDto);
                if (errors.length > 0) {
                    throw new BadRequestException(errors);
                }

                const { therapistDetailsResponse: therapistDetails } =
                    updateTherapistDto;

                if (!therapistDetails)
                    throw new BadRequestException("No valid data");

                // eslint-disable-next-line no-unused-vars -- because we need to save the therapist details without the tz
                const { tz, ...therapistDetailsWithoutTz } = therapistDetails;

                return this.therapistService.updateTherapistSurveyResponse(id, {
                    therapistDetailsResponse: therapistDetailsWithoutTz,
                });
            } else {
                const createTherapistDto = plainToInstance(TherapistRegisterDto, {
                    healthcareCenterId: "678f965b4daacc6eac544ca7", //TODO remove hardcoded
                    ...surveyData,
                });

                // Validate the data
                const errors = await validate(createTherapistDto);
                if (errors.length > 0) throw new BadRequestException(errors);

                const { tz, healthcareCenterId, ...therapistDetails } =
                    createTherapistDto;

                return this.therapistService.createTherapist({
                    healthcareCenterId,
                    ...therapistDetails,
                    tz: encryptTz(String(tz)),
                    therapistDetailsResponse: therapistDetails,
                });
            }
        }
        if (surveyAction === SURVEY_ACTIONS.traumaResponse) {
            const data = { patientTraumaResponse: surveyData };

            const errors = await validate(data);
            if (errors.length > 0) throw new BadRequestException(errors);
            if (!id)
                throw new BadRequestException("No ID for the patient was provided");

            return this.patientService.updatePatientSurveyResponse(id, data);
        }
    }
}
