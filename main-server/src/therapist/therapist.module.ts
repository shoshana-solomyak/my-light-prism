import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";

import {
    USER_MODULE_OPTIONS,
    UserModule,
    UserService,
} from "@hilma/auth-mongo-nest";

import { ROLES } from "../auth/constants/role.constants";
import { therapistSchema } from "./mongodb-schemas/therapist.schema";
import { TherapistController } from "./therapist.controller";
import { TherapistDataAccess } from "./therapist.data-access";
import { TherapistService } from "./therapist.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: ROLES.therapist.name,
                schema: therapistSchema,
                collection: "users",
            },
        ]),
        UserModule,
        JwtModule,
    ],
    providers: [
        {
            provide: TherapistService.name,
            useClass: TherapistService,
        },
        {
            provide: TherapistDataAccess.name,
            useClass: TherapistDataAccess,
        },
        {
            provide: USER_MODULE_OPTIONS,
            useValue: {},
        },
        {
            // Swap the UserService provider with our TherapistService provider
            provide: UserService.name,
            useExisting: TherapistService.name,
        },
    ],
    exports: [TherapistService.name],
    controllers: [TherapistController],
})
export class TherapistModule {}
