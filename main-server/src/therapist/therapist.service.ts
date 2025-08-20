import {
    BadRequestException,
    HttpException,
    Inject,
    Injectable,
    Logger,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";

import { decryptTz } from "src/functions/decrypt-tz.function";
import { UpdateTherapistDto } from "src/patient/dto/update-therapist-dto";

import {
    type AuthConfig,
    USER_MODULE_OPTIONS,
    type UserConfig,
    UserService,
} from "@hilma/auth-mongo-nest";

import { TherapistsColumns } from "@internal/types";

import { ROLES } from "../auth/constants/role.constants";
import { TherapistRegisterDto } from "./dto/create-therapist.dto";
import type {
    Therapist,
    TherapistDocument,
} from "./mongodb-schemas/therapist.schema";
import { TherapistDataAccess } from "./therapist.data-access";

@Injectable()
export class TherapistService extends UserService {
    // eslint-disable-next-line @typescript-eslint/max-params -- constructor
    constructor(
        // UserService dependencies:
        @Inject(USER_MODULE_OPTIONS) protected readonly userOptions: UserConfig,
        @InjectModel(ROLES.therapist.name) therapistModel: Model<TherapistDocument>,
        protected readonly jwtService: JwtService,
        protected readonly configService: ConfigService<AuthConfig>,
        // Other dependencies:
        @Inject(TherapistDataAccess.name)
        private readonly therapistDataAccess: TherapistDataAccess,
    ) {
        super(userOptions, therapistModel as never, jwtService, configService);
    }

    private readonly therapistLogger: Logger = new Logger(TherapistService.name);

    getTherapist(id: string, healthcareCenterId: string) {
        return this.therapistDataAccess.getTherapistById(id, healthcareCenterId);
    }

    async createTherapist(createDto: TherapistRegisterDto): Promise<Therapist> {
        const { tz, ...therapistCredentialsWithoutTz } = createDto;
        const user: Omit<
            Therapist,
            | "_id"
            | "createdAt"
            | "updatedAt"
            | "id"
            | "healthcareCenterId"
            | "type"
            | "password"
        > = {
            ...therapistCredentialsWithoutTz,
            username: tz,
            roles: [ROLES.therapist],
        };
        try {
            return await this.createUser(user);
        } catch (error) {
            this.therapistLogger.error("Error creating therapist");
            this.therapistLogger.verbose(error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new BadRequestException();
        }
    }
    async getTherapists(healthcareCenterId: string): Promise<TherapistsColumns[]> {
        const therapists =
            await this.therapistDataAccess.getTherapists(healthcareCenterId);
        return therapists.map(
            ({ _id, createdAt, updatedAt, firstName, lastName }) => ({
                id: _id,
                createdAt,
                updatedAt,
                firstName,
                lastName,
            }),
        );
    }
    async getTherapistPersonalDetails(id: string) {
        const therapist =
            await this.therapistDataAccess.getTherapistPersonalDetailsById(id);

        return {
            tz: therapist?.username && decryptTz(therapist?.username),
            ...therapist?.therapistDetailsResponse,
        };
    }

    async updateTherapistSurveyResponse(id: string, updateDto: UpdateTherapistDto) {
        const editedFields: Partial<Therapist> = {};

        const { therapistDetailsResponse } = updateDto;
        if (therapistDetailsResponse.firstName)
            editedFields.firstName = String(therapistDetailsResponse.firstName);
        if (therapistDetailsResponse.lastName)
            editedFields.lastName = String(therapistDetailsResponse.lastName);

        const result = await this.therapistDataAccess.updateTherapist(id, {
            ...updateDto,
            ...editedFields,
        });

        if (result.modifiedCount === 0) {
            throw new Error("Therapist not found or no changes were made");
        }

        return { message: "Therapist updated successfully" };
    }
}
