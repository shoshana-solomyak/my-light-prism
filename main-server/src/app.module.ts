import { type MiddlewareConsumer, Module, type NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

import { AdminModule } from "./admin/admin.module";
import { loadAuthConfig } from "./auth.config";
import { AuthModule } from "./auth/auth.module";
import { IS_TEST_ENV } from "./common/constants/is-development-env.constant";
import { createMongoDbUri } from "./create-mongodb-uri.function";
import { HealthController } from "./health/health.controller";
import { HealthcareCenterModule } from "./healthcare-center/healthcare-center.module";
import { HttpLoggerMiddleware } from "./middlewares/http-logger.middleware";
import { PatientModule } from "./patient/patient.module";
import { SurveyHandlerModule } from "./survey-handler/survey-handler.module";
import { SurveySchemaModule } from "./survey-schema/survey-schema.module";
import { TestApiModule } from "./test-api/test-api.module";
import { TherapistModule } from "./therapist/therapist.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env.${process.env.NODE_ENV}`,
            isGlobal: true,
            load: [loadAuthConfig],
        }),
        MongooseModule.forRoot(createMongoDbUri()),
        AuthModule,
        TherapistModule,
        AdminModule,
        PatientModule,
        SurveySchemaModule,
        SurveyHandlerModule,
        HealthcareCenterModule,

        TestApiModule.forRoot(IS_TEST_ENV),
    ],
    controllers: [HealthController],
    providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(HttpLoggerMiddleware).forRoutes("*");
    }
}
