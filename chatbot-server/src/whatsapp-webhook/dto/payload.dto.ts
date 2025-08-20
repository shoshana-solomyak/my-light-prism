import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString, ValidateNested } from "class-validator";

import type { MetaAPI } from "../types/meta-api.namespace";

type Entry = MetaAPI.Payload["entry"][number];
type Change = Entry["changes"][number];
type Value = Change["value"];
type Metadata = Value["metadata"];

export class MetaPayloadDto implements MetaAPI.Payload {
    @IsString()
    object!: "whatsapp_business_account";

    @IsArray()
    @Type(() => EntryDto)
    @ValidateNested({ each: true })
    entry!: MetaAPI.Payload["entry"];
}

class EntryDto implements Entry {
    @IsString()
    id!: string;

    @IsArray()
    @Type(() => ChangeDto)
    @ValidateNested({ each: true })
    changes!: Entry["changes"];
}

class ChangeDto implements Change {
    @Type(() => ValueDto)
    @ValidateNested()
    value!: Change["value"];

    @IsString()
    field!: "messages";
}

class ValueDto implements Value {
    @IsString()
    /* eslint-disable-next-line @typescript-eslint/naming-convention -- Names given by Meta */
    messaging_product!: "whatsapp";

    @Type(() => MetadataDto)
    @ValidateNested()
    metadata!: Metadata;

    @IsOptional()
    @IsArray()
    contacts?: Value["contacts"];

    @IsOptional()
    @IsArray()
    errors?: Value["errors"];

    @IsOptional()
    @IsArray()
    messages?: Value["messages"];

    @IsOptional()
    @IsArray()
    statuses?: Value["statuses"];
}

class MetadataDto implements Metadata {
    @IsString()
    /* eslint-disable-next-line @typescript-eslint/naming-convention -- Names given by Meta */
    display_phone_number!: string;

    @IsString()
    /* eslint-disable-next-line @typescript-eslint/naming-convention -- Names given by Meta */
    phone_number_id!: string;
}
