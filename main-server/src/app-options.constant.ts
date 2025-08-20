import type { ValidationPipeOptions } from "@nestjs/common";

export const VALIDATION_PIPE_OPTIONS: ValidationPipeOptions = {
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    validateCustomDecorators: true,
};
