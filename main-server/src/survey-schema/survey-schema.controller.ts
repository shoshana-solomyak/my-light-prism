import { Controller, Get, Inject, Param, Query } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";

import type { SurveyId } from "@internal/types";

import { SurveySchemaService } from "./survey-schema.service";

@Controller("survey-schema")
export class SurveySchemaController {
    constructor(
        @Inject(SurveySchemaService.name)
        private readonly surveySchemaService: SurveySchemaService,
    ) {}

    @Get(":schemaId")
    @ApiOperation({
        summary: "Find schema by schemaID",
        description: "Find schema by schemaID. Used when showing a survey",
    })
    getBySchemaId(
        @Param("schemaId") schemaId: SurveyId,
        @Query("isAdmin") isAdmin?: boolean,
    ) {
        return this.surveySchemaService.getBySchemaId(schemaId, isAdmin);
    }
}
