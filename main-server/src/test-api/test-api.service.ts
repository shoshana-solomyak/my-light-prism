import { Injectable } from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import { Connection } from "mongoose";

import { AdminService } from "../admin/admin.service";
import { HealthcareCenterService } from "../healthcare-center/healthcare-center.service";
import { TestCreateAdminDto } from "./dto/create-admin.dto";

@Injectable()
export class TestApiService {
    constructor(
        private readonly adminService: AdminService,
        private readonly hcService: HealthcareCenterService,
        @InjectConnection() private readonly connection: Connection,
    ) {}

    async createAdmin({ admin, center }: TestCreateAdminDto) {
        const newCenter = await this.hcService.createCenter(center);

        return this.adminService.createAdmin({
            ...admin,
            healthcareCenterId: String(newCenter._id),
        });

        //? We might want to seed the database for admin system here, with the created hc id
    }

    deleteAllDocuments() {
        Object.keys(this.connection.collections).forEach((collection) => {
            void this.connection.collections[collection].deleteMany({});
        });
    }
}
