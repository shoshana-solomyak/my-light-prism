import { DynamicModule, Module } from "@nestjs/common";

import { AdminModule } from "../admin/admin.module";
import { HealthcareCenterModule } from "../healthcare-center/healthcare-center.module";
import { TestApiController } from "./test-api.controller";
import { TestApiService } from "./test-api.service";

/**
 * Empty placeholder module
 */
@Module({})
class EmptyModule {}

/**
 * This module exports API endpoints that should be available only in "test" environment.
 *
 * The endpoints provide a quick way to perform actions that are otherwise not available,
 * or complicated to achieve via UI, but required for E2E testing.
 *
 * For example:
 * - DB seeding
 * - Admin creation
 */

@Module({})
export class TestApiModule {
    static forRoot(shouldExpose: boolean): DynamicModule {
        if (!shouldExpose) return { module: EmptyModule };

        return {
            module: TestApiModule,
            imports: [AdminModule, HealthcareCenterModule],
            controllers: [TestApiController],
            providers: [TestApiService],
        };
    }
}
