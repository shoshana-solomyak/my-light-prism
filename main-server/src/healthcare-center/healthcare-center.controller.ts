import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";

import { ROLES } from "src/auth/constants/role.constants";
import { RequestAdminType } from "src/common/types/request-admin.interface";

import { RequestUser, UseJwtAuth } from "@hilma/auth-mongo-nest";

import { CreateCenterDto } from "./create-center.dto";
import { HealthcareCenterService } from "./healthcare-center.service";

@Controller("healthcare-center")
export class HealthcareCenterController {
    constructor(private readonly healthcareCenterService: HealthcareCenterService) {}

    @UseJwtAuth({ roles: [] })
    @Post("create-center")
    @ApiOperation({
        summary: "Create a healthcare center",
        description: "Create healthcare center",
    })
    postCreateCenter(@Body() center: CreateCenterDto) {
        return this.healthcareCenterService.createCenter(center);
    }

    @UseJwtAuth({ roles: [ROLES.admin.name] })
    @Get("details")
    @ApiOperation({
        summary: "Get center by id",
        description: "Get center details by id. used in the center details page",
    })
    getDetails(@RequestUser() user: RequestAdminType) {
        return this.healthcareCenterService.getHealthcareCenter(
            user.healthcareCenterId,
        );
    }
}
