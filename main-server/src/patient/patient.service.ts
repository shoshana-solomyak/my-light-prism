import {
    BadRequestException,
    HttpException,
    Inject,
    Injectable,
    Logger,
    UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";

import { decryptTz } from "src/functions/decrypt-tz.function";

import {
    type AuthConfig,
    TwoFactorService,
    USER_MODULE_OPTIONS,
    type UserConfig,
    UserService,
} from "@hilma/auth-mongo-nest";

import { PatientsColumns } from "@internal/types";

import { ROLES } from "../auth/constants/role.constants";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { PatientLoginSendCodeDTO } from "./dto/send-code.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import type { Patient, PatientDocument } from "./mongodb-schema/patient.schema";
import { PatientDataAccess } from "./patient.data-access";

@Injectable()
export class PatientService extends UserService {
    // eslint-disable-next-line @typescript-eslint/max-params -- constructor
    constructor(
        @Inject(USER_MODULE_OPTIONS) protected readonly userOptions: UserConfig,
        @InjectModel(ROLES.patient.name) patientModel: Model<PatientDocument>,
        protected readonly jwtService: JwtService,
        protected readonly configService: ConfigService<AuthConfig>,
        @Inject(TwoFactorService)
        protected readonly twoFactorService: TwoFactorService,
        @Inject(PatientDataAccess.name)
        private readonly patientDataAccess: PatientDataAccess,
    ) {
        super(userOptions, patientModel as never, jwtService, configService);
    }

    private readonly patientLogger: Logger = new Logger(PatientService.name);

    async createPatient(createDto: CreatePatientDto): Promise<Patient> {
        const { tz, ...patientCredentialsWithoutTz } = createDto;
        const user: Omit<
            Patient,
            | "_id"
            | "createdAt"
            | "updatedAt"
            | "id"
            | "healthcareCenterId"
            | "type"
            | "password"
        > = {
            ...patientCredentialsWithoutTz,
            username: tz,
            roles: [ROLES.patient],
        };
        try {
            return await this.createUser(user);
        } catch (error) {
            this.patientLogger.error("Error creating Patient");
            this.patientLogger.verbose(error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new BadRequestException();
        }
    }

    async updatePatientSurveyResponse(id: string, updateDto: UpdatePatientDto) {
        const editedFields: Partial<Patient> = {};

        if (updateDto.patientDetailsResponse) {
            const { patientDetailsResponse } = updateDto;
            if (patientDetailsResponse.firstName)
                editedFields.firstName = String(patientDetailsResponse.firstName);
            if (patientDetailsResponse.lastName)
                editedFields.lastName = String(patientDetailsResponse.lastName);
        }

        const result = await this.patientDataAccess.updatePatient(id, {
            ...updateDto,
            ...editedFields,
        });

        if (result.modifiedCount === 0) {
            throw new Error("Patient not found or no changes were made");
        }

        return { message: "Patient updated successfully" };
    }

    async getPatients(healthcareCenterId: string): Promise<PatientsColumns[]> {
        const patients =
            await this.patientDataAccess.getPatients(healthcareCenterId);
        return patients.map(
            ({ _id, createdAt, updatedAt, firstName, lastName }) => ({
                id: _id,
                createdAt,
                updatedAt,
                firstName,
                lastName,
            }),
        );
    }

    getPatient(id: string, healthcareCenterId: string) {
        return this.patientDataAccess.getPatientById(id, healthcareCenterId);
    }

    async getPatientPersonalDetails(id: string) {
        const patient =
            await this.patientDataAccess.getPatientPersonalDetailsById(id);

        return {
            tz: patient?.username && decryptTz(patient?.username),
            ...patient?.patientDetailsResponse,
        };
    }

    async getPatientTraumaResponse(id: string) {
        const result = await this.patientDataAccess.getPatientTraumaResponseById(id);

        return result?.patientTraumaResponse;
    }

    async getRequestUserData({ tz, birthDate }: PatientLoginSendCodeDTO) {
        const patient = await this.patientDataAccess.getRequestUserData(
            tz,
            birthDate,
        );
        if (!patient) throw new UnauthorizedException();

        return {
            ...patient,
            roles: patient.roles!.map((role) => role.name),
            roleKeys: patient.roles!.map((role) => role.roleKey),
            phoneNumber: patient.phoneNumber,
        };
    }
}
