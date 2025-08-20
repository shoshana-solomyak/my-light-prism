import type { INestApplication } from "@nestjs/common";
import { ValidationPipe } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";

import {
    NEST_APP_OPTIONS,
    VALIDATION_PIPE_OPTIONS,
} from "../src/app-options.constant";

/**
 * A setup function for integration & e2e tests that require http mocking.
 * The function purpose is to ensure consistency between the real app settings and the testing apps
 * @param module the testing module instance
 * @returns testing nest application instance
 */
export function setupTestingApp(module: TestingModule): INestApplication {
    const app = module.createNestApplication(NEST_APP_OPTIONS);

    app.useGlobalPipes(new ValidationPipe(VALIDATION_PIPE_OPTIONS));
    app.setGlobalPrefix("api");

    return app;
}
