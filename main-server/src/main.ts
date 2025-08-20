import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import mongoose from "mongoose";

import cookieParser from "cookie-parser";

import { VALIDATION_PIPE_OPTIONS } from "./app-options.constant";
import { AppModule } from "./app.module";

async function bootstrap() {
    if (process.env.NODE_ENV === "development") mongoose.set("debug", true);

    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe(VALIDATION_PIPE_OPTIONS));
    app.setGlobalPrefix("api");

    await app.listen(8080);
}

void bootstrap();
