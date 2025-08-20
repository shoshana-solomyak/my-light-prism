import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { NEST_APP_OPTIONS, VALIDATION_PIPE_OPTIONS } from "./app-options.constant";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, NEST_APP_OPTIONS);

    app.useGlobalPipes(new ValidationPipe(VALIDATION_PIPE_OPTIONS));
    app.setGlobalPrefix("api");
    await app.listen(8081);
}
void bootstrap();
