import type { NestApplicationOptions, ValidationPipeOptions } from "@nestjs/common";

export const VALIDATION_PIPE_OPTIONS: ValidationPipeOptions = {
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    validateCustomDecorators: true,
};

export const NEST_APP_OPTIONS: NestApplicationOptions = {
    /**
     * Enables rawBody for all endpoints.
     */
    rawBody: true,
};
