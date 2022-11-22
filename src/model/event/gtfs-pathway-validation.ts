import { Prop } from "nodets-ms-core/lib/models";
import { GTFSPathwayUpload } from "./gtfs-pathway-upload";

export class GTFSPathwayValidation extends GTFSPathwayUpload {
    @Prop('is_valid')
    isValid:boolean = false;
    @Prop('validation_message')
    validationMessage?:string;
    @Prop('validation_time')
    validationTime:number = 0;
}