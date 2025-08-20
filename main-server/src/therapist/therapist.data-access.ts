import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";

import { ROLES } from "../auth/constants/role.constants";
import type {
    Therapist,
    TherapistDocument,
} from "./mongodb-schemas/therapist.schema";

@Injectable()
export class TherapistDataAccess {
    constructor(
        @InjectModel(ROLES.therapist.name)
        private readonly therapistModel: Model<TherapistDocument>,
    ) {}

    getTherapists(healthcareCenterId: string) {
        return this.therapistModel.find({ healthcareCenterId });
    }

    getTherapistById(id: string, healthcareCenterId: string) {
        return this.therapistModel.findOne({
            _id: id,
            healthcareCenterId,
        });
    }

    updateTherapist(id: string, data: Partial<Therapist>) {
        return this.therapistModel.updateOne({ _id: id }, data).exec();
    }

    getTherapistPersonalDetailsById(id: string) {
        return this.therapistModel.findOne(
            { _id: id },
            { therapistDetailsResponse: 1, _id: 0, username: 1 },
        );
    }
}
