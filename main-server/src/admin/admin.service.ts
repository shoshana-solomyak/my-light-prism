import {
    BadRequestException,
    HttpException,
    Inject,
    Injectable,
    Logger,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";

import {
    type AuthConfig,
    USER_MODULE_OPTIONS,
    type UserConfig,
    UserService,
} from "@hilma/auth-mongo-nest";

import type { AdminDetailsColumns } from "@internal/types";

import { ROLES } from "../auth/constants/role.constants";
import { AdminDataAccess } from "./admin.data-access";
import { CreateAdminDto } from "./dto/create-admin.dto";
import type { Admin, AdminDocument } from "./mongodb-schema/admin.schema";

@Injectable()
export class AdminService extends UserService {
    // eslint-disable-next-line @typescript-eslint/max-params -- constructor
    constructor(
        // UserService dependencies:
        @Inject(USER_MODULE_OPTIONS) protected readonly userOptions: UserConfig,
        @InjectModel(ROLES.admin.name) adminModel: Model<AdminDocument>,
        protected readonly jwtService: JwtService,
        protected readonly configService: ConfigService<AuthConfig>,
        // Other dependencies:
        @Inject(AdminDataAccess.name)
        private readonly adminDataAccess: AdminDataAccess,
    ) {
        super(userOptions, adminModel as never, jwtService, configService);
    }

    private readonly adminLogger: Logger = new Logger(AdminService.name);

    async createAdmin(createDto: CreateAdminDto): Promise<Admin> {
        const { email, ...adminCredentialsWithoutEmail } = createDto;
        const user: Omit<Admin, "_id" | "createdAt" | "updatedAt" | "id" | "type"> =
            {
                ...adminCredentialsWithoutEmail,
                username: email,
                roles: [ROLES.admin],
            };
        try {
            return await this.createUser(user);
        } catch (error) {
            this.adminLogger.error("Error creating admin");
            this.adminLogger.verbose(error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new BadRequestException();
        }
    }
    async getDetailsOfAdminHealthcareCenter(
        id: string,
    ): Promise<AdminDetailsColumns[]> {
        const admins = await this.adminDataAccess.getAdminsByCenterID(id);
        return admins.map((a) => ({
            ...a,
            id: a._id,
            fullName: `${a.firstName} ${a?.lastName ?? ""}`,
        }));
    }
}
