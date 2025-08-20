import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";

import { ROLES } from "../auth/constants/role.constants";
import type { AdminDocument } from "./mongodb-schema/admin.schema";

@Injectable()
export class AdminDataAccess {
    constructor(
        @InjectModel(ROLES.admin.name)
        private readonly adminModel: Model<AdminDocument>,
    ) {}

    /**
     * Example  \
     * TODO: Remove
     */
    getAdmins() {
        return this.adminModel.find();
    }

    /**
     * Example  \
     * TODO: Remove
     */
    getAdminById(id: string) {
        return this.adminModel.findOne({ _id: id });
    }
    getAdminsByCenterID(id: string): Promise<AdminDocument[]> {
        return this.adminModel
            .find({ healthcareCenterId: id })
            .lean<AdminDocument[]>()
            .exec();
    }
}
