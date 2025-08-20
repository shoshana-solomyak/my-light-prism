import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";

import {
    USER_MODULE_OPTIONS,
    UserModule,
    UserService,
} from "@hilma/auth-mongo-nest";

import { ROLES } from "../auth/constants/role.constants";
import { IS_TEST_ENV } from "../common/constants/is-development-env.constant";
import { AdminController } from "./admin.controller";
import { AdminDataAccess } from "./admin.data-access";
import { AdminService } from "./admin.service";
import { adminSchema } from "./mongodb-schema/admin.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ROLES.admin.name, schema: adminSchema, collection: "users" },
        ]),
        UserModule,
        JwtModule,
    ],
    providers: [
        AdminService,
        {
            // Swap the UserService provider with our AdminService provider
            provide: UserService.name,
            useExisting: AdminService,
        },
        {
            provide: AdminDataAccess.name,
            useClass: AdminDataAccess,
        },
        {
            provide: USER_MODULE_OPTIONS,
            useValue: {},
        },
    ],
    controllers: [AdminController],
    exports: IS_TEST_ENV ? [AdminService, UserService.name] : [],
})
export class AdminModule {}
