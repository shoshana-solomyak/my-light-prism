import { OmitType } from "@nestjs/swagger";

import { Type } from "class-transformer";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { CreateAdminDto } from "src/admin/dto/create-admin.dto";
import { CreateCenterDto } from "src/healthcare-center/create-center.dto";

class TestAdminDto extends OmitType(CreateAdminDto, ["healthcareCenterId"]) {}

export class TestCreateAdminDto {
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => TestAdminDto)
    admin!: TestAdminDto;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CreateCenterDto)
    center!: CreateCenterDto;
}
