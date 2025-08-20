import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { ROLES } from "src/auth/constants/role.constants";
import { RequestAdminType } from "src/common/types/request-admin.interface";

import { RequestUser, UseJwtAuth } from "@hilma/auth-mongo-nest";

import { AdminDetailsColumns } from "@internal/types";

import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";

@ApiTags("Admin")
@Controller("admin")
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Post("register")
    @ApiOperation({
        summary: "Create an admin",
        description: "Create a new admin.",
    })
    async postRegister(@Body() adminCredentials: CreateAdminDto) {
        await this.adminService.createAdmin(adminCredentials);
        return true;
    }

    @UseJwtAuth({ roles: [ROLES.admin.name] })
    @Get("all-by-id")
    @ApiOperation({
        summary: "Get admin by healthcareCenter id",
        description:
            "Get admin details by healthcareCenter id. used in the center details page",
    })
    getAllById(
        @RequestUser() user: RequestAdminType,
    ): Promise<AdminDetailsColumns[]> {
        return this.adminService.getDetailsOfAdminHealthcareCenter(
            user.healthcareCenterId,
        );
    }
}
