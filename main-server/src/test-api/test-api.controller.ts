import { Body, Controller, Post } from "@nestjs/common";

import { TestCreateAdminDto } from "./dto/create-admin.dto";
import { TestApiService } from "./test-api.service";

@Controller("test")
export class TestApiController {
    constructor(private readonly testApiService: TestApiService) {}

    @Post("create-admin")
    postCreateAdmin(@Body() body: TestCreateAdminDto) {
        return this.testApiService.createAdmin(body);
    }

    @Post("db/clear")
    postDbClear() {
        return this.testApiService.deleteAllDocuments();
    }
}
