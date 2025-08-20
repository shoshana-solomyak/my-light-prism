import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { UserModule } from "@hilma/auth-mongo-nest";

import { IS_TEST_ENV } from "../common/constants/is-development-env.constant";
import { HealthcareCenterController } from "./healthcare-center.controller";
import { HealthcareCenterDataAccess } from "./healthcare-center.data-access";
import { HealthcareCenterService } from "./healthcare-center.service";
import {
    HealthcareCenter,
    healthcareCenterSchema,
} from "./mongodb-schema/healthcare-center.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: HealthcareCenter.name,
                schema: healthcareCenterSchema,
            },
        ]),
        UserModule,
    ],
    providers: [
        HealthcareCenterService,

        {
            provide: HealthcareCenterDataAccess.name,
            useClass: HealthcareCenterDataAccess,
        },
    ],
    controllers: [HealthcareCenterController],
    exports: IS_TEST_ENV ? [HealthcareCenterService] : [],
})
export class HealthcareCenterModule {}
