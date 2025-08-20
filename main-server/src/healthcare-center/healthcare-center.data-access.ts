import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { CreateCenterDto } from "./create-center.dto";
import {
    HealthcareCenter,
    HealthcareCenterDocument,
} from "./mongodb-schema/healthcare-center.schema";

@Injectable()
export class HealthcareCenterDataAccess {
    constructor(
        @InjectModel(HealthcareCenter.name)
        private readonly healthcareCenterModel: Model<HealthcareCenterDocument>,
    ) {}

    createHealthcareCenter(name: string): Promise<HealthcareCenterDocument> {
        return this.healthcareCenterModel.create({ name });
    }
    createCenter(center: CreateCenterDto) {
        return this.healthcareCenterModel.create(center);
    }

    findHealthCareCenter(id: string) {
        return this.healthcareCenterModel.findOne({ _id: id });
    }
}
