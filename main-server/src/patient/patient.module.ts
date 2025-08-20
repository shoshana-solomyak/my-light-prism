import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";

import {
    TwoFactorModule,
    USER_MODULE_OPTIONS,
    UserModule,
    UserService,
} from "@hilma/auth-mongo-nest";

import { ROLES } from "../auth/constants/role.constants";
import { patientSchema } from "./mongodb-schema/patient.schema";
import { PatientController } from "./patient.controller";
import { PatientDataAccess } from "./patient.data-access";
import { PatientService } from "./patient.service";

@Module({
    imports: [
        TwoFactorModule,
        MongooseModule.forFeature([
            { name: ROLES.patient.name, schema: patientSchema, collection: "users" },
        ]),
        UserModule,
        JwtModule,
    ],
    providers: [
        {
            provide: PatientService.name,
            useClass: PatientService,
        },
        {
            provide: PatientDataAccess.name,
            useClass: PatientDataAccess,
        },
        {
            provide: USER_MODULE_OPTIONS,
            useValue: {},
        },
        {
            // Swap the UserService provider with our PatientService provider
            provide: UserService.name,
            useExisting: PatientService.name,
        },
    ],
    exports: [PatientService.name],
    controllers: [PatientController],
})
export class PatientModule {}
