import { Module } from "@nestjs/common";

import { SurveySchemaController } from "./survey-schema.controller";
import { SurveySchemaService } from "./survey-schema.service";

@Module({
    imports: [],
    providers: [
        {
            provide: SurveySchemaService.name,
            useClass: SurveySchemaService,
        },
    ],
    controllers: [SurveySchemaController],
})
export class SurveySchemaModule {}
