import { AbstractDomainEntity, Prop } from "nodets-ms-core/lib/models";

//Describes a gtfs pathways file meta data.
export class GTFSPathwayUpload extends AbstractDomainEntity {
    @Prop('tdei_org_id')
    tdeiOrgId?: string;
    @Prop('tdei_station_id')
    tdeiStationId?: string;
    @Prop('collected_by')
    collectedBy?: string;
    @Prop('collection_method')
    collectionMethod?:string;
    @Prop('file_upload_path')
    fileUploadPath?:string;
    @Prop('user_id')
    userId?:string;
    @Prop('collection_date')
    collectionDate?:string;
    @Prop('valid_from')
    validFrom?:string;
    @Prop('valid_to')
    validTo?:string;
    @Prop('data_source')
    dataSource?:string;
    @Prop('pathways_schema_version')
    pathwaysSchemaVersion:string = "1.0.0";
}