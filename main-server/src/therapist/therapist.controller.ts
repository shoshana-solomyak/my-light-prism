import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";

import { ROLES } from "src/auth/constants/role.constants";
import { RequestAdminType } from "src/common/types/request-admin.interface";

import { RequestUser, UseJwtAuth } from "@hilma/auth-mongo-nest";

import { TherapistRegisterDto } from "./dto/create-therapist.dto";
import { TherapistService } from "./therapist.service";

@Controller("therapist")
export class TherapistController {
    constructor(
        @Inject(TherapistService.name)
        private readonly therapistService: TherapistService,
    ) {}

    @Get("all")
    @ApiOperation({
        summary: "Get all therapists",
        description: "Get all therapists. used in the therapists admin table",
    })
    @UseJwtAuth({ roles: [ROLES.admin.name] })
    getAll(@RequestUser() user: RequestAdminType) {
        return this.therapistService.getTherapists(user.healthcareCenterId);
    }

    @Get(":id")
    @ApiOperation({
        summary: "Get therapist by id",
        description: "Get therapist by id. used in the therapist page",
    })
    @UseJwtAuth({ roles: [ROLES.admin.name] })
    getById(@Param("id") id: string, @RequestUser() user: RequestAdminType) {
        return this.therapistService.getTherapist(id, user.healthcareCenterId);
    }

    @Post("register")
    @ApiOperation({
        summary: "Create a new therapist",
        description: "Create a new therapist.",
    })
    async postRegister(@Body() therapistCredentials: TherapistRegisterDto) {
        await this.therapistService.createTherapist(therapistCredentials);
        return true;
    }
    @Get("personal-details/:id")
    @ApiOperation({
        summary: "Get therapist's personal details",
        description: "Get therapist's personal details based on their id",
    })
    getPersonalDetailsById(@Param("id") id: string) {
        return this.therapistService.getTherapistPersonalDetails(id);
    }
}
