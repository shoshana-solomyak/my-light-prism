import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";

import { ROLES } from "src/auth/constants/role.constants";
import { RequestAdminType } from "src/common/types/request-admin.interface";

import { UseJwtAuth } from "@hilma/auth-mongo-nest";
import { RequestUser } from "@hilma/auth-mongo-nest";

import { SuggestedTherapistsColumns } from "@internal/types";

import { CreatePatientDto } from "./dto/create-patient.dto";
import { PatientService } from "./patient.service";

@Controller("patient")
export class PatientController {
    constructor(
        @Inject(PatientService.name) private readonly patientService: PatientService,
    ) {}

    @Get("all")
    @ApiOperation({
        summary: "Get all patients",
        description: "Get all patients. used in the patients admin table",
    })
    @UseJwtAuth({ roles: [ROLES.admin.name] })
    getAll(@RequestUser() user: RequestAdminType) {
        return this.patientService.getPatients(user.healthcareCenterId);
    }

    @Get("therapist-suggestions")
    @ApiOperation({
        summary: "Get patient's therapist suggestions",
        description:
            "Get patient's therapist suggestions. used in the patients admin table",
    })
    @UseJwtAuth({ roles: [ROLES.admin.name] })
    //TODO use the matching algorithm
    getTherapistSuggestions(): SuggestedTherapistsColumns[] {
        return [
            {
                id: "7",
                therapistName: "yakira",
                compatibilityPercentage: "20%",
                compatibilityReasons: {
                    gender: "1",
                    language: "-1",
                    religiousSector: "0",
                    treatmentLocation: "-1",
                    vocationalTraining: "-1",
                },
            },
            {
                id: "9",
                therapistName: "tamar",
                compatibilityPercentage: "80%",
                compatibilityReasons: {
                    gender: "1",
                    language: "1",
                    religiousSector: "0",
                    treatmentLocation: "1",
                    vocationalTraining: "-1",
                },
            },
        ];
    }

    @Get(":id")
    @ApiOperation({
        summary: "Get patient by id",
        description: "Get patient by id. used in the patient page",
    })
    @UseJwtAuth({ roles: [ROLES.admin.name] })
    getById(@Param("id") id: string, @RequestUser() user: RequestAdminType) {
        return this.patientService.getPatient(id, user.healthcareCenterId);
    }

    @Post("register")
    @ApiOperation({
        summary: "Create a new patient",
        description:
            "Create a new patient. Used when a client registers as a patient",
    })
    async postRegister(@Body() patientCredentials: CreatePatientDto) {
        await this.patientService.createPatient(patientCredentials);
        return true;
    }

    @Get("personal-details/:id")
    @ApiOperation({
        summary: "Get patient's personal details",
        description: "Get patient's personal details based on their id",
    })
    getPersonalDetailsById(@Param("id") id: string) {
        return this.patientService.getPatientPersonalDetails(id);
    }

    @Get("trauma-response/:id")
    @UseJwtAuth({ roles: [ROLES.admin.name] })
    getTraumaResponseById(@Param("id") id: string) {
        return this.patientService.getPatientTraumaResponse(id);
    }
}
