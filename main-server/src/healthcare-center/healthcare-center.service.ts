import { Inject, Injectable } from "@nestjs/common";

import { CreateCenterDto } from "./create-center.dto";
import { HealthcareCenterDataAccess } from "./healthcare-center.data-access";

@Injectable()
export class HealthcareCenterService {
    constructor(
        @Inject(HealthcareCenterDataAccess.name)
        private readonly healthcareCenterDataAccess: HealthcareCenterDataAccess,
    ) {}

    async createCenter(healthcareCenter: CreateCenterDto) {
        return (await this.healthcareCenterDataAccess.createCenter(healthcareCenter))
            .id;
    }

    getHealthcareCenter(id: string) {
        return this.healthcareCenterDataAccess.findHealthCareCenter(id);
    }
}
