import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";

import { encryptTz } from "src/functions/encrypt-tz.function";
import { PatientForLogin } from "src/patient/types/patient-for-login.interface";

import { ROLES } from "../auth/constants/role.constants";
import type { Patient, PatientDocument } from "./mongodb-schema/patient.schema";

@Injectable()
export class PatientDataAccess {
    constructor(
        @InjectModel(ROLES.patient.name)
        private readonly patientModel: Model<PatientDocument>,
    ) {}

    getPatients(healthcareCenterId: string) {
        return this.patientModel.find({ healthcareCenterId });
    }

    getPatientById(id: string, healthcareCenterId: string) {
        return this.patientModel.findOne({
            _id: id,
            healthcareCenterId,
        });
    }

    getPatientPersonalDetailsById(id: string) {
        return this.patientModel.findOne(
            { _id: id },
            { patientDetailsResponse: 1, _id: 0, username: 1 },
        );
    }

    updatePatient(id: string, data: Partial<Patient>) {
        return this.patientModel.updateOne({ _id: id }, data).exec();
    }

    getPatientTraumaResponseById(id: string) {
        return this.patientModel.findOne(
            { _id: id },
            {
                patientTraumaResponse: 1,
                _id: 0,
                //  Todo: add the survey data field
            },
        );
    }

    getRequestUserData(tz: string, birthDate: string) {
        return this.patientModel
            .findOne(
                {
                    username: encryptTz(tz),
                    birthDate: new Date(birthDate),
                },
                {
                    username: 1,
                    phoneNumber: 1,
                    roles: 1,
                    type: 1,
                },
            )
            .lean<PatientForLogin>();
    }
}
