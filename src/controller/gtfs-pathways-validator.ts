import { Core } from "nodets-ms-core";
import { ILoggable } from "nodets-ms-core/lib/core/logger/abstracts/ILoggable";
import { QueueMessage } from "nodets-ms-core/lib/core/queue";
import { ITopicSubscription } from "nodets-ms-core/lib/core/queue/abstracts/IMessage-topic";
import { Topic } from "nodets-ms-core/lib/core/queue/topic";
import { FileEntity } from "nodets-ms-core/lib/core/storage";
import { unescape } from "querystring";
import { GTFSPathwayUpload } from "../model/event/gtfs-pathway-upload";
import { GTFSPathwayValidation } from "../model/event/gtfs-pathway-validation";
import { IValidator } from "./interface/iValidator";


interface ValidationResult {
    isValid: boolean,
    validationMessage: string
}

export class GTFSPathwaysValidator implements IValidator, ITopicSubscription {

    readonly listeningTopicName = 'gtfs-pathways-upload';
    readonly publishingTopicName = 'gtfs-pathways-validation';
    readonly subscriptionName = 'uploadprocessor';
    listeningTopic: Topic;
    publishingTopic: Topic;
    logger: ILoggable;

    constructor(){
        Core.initialize();
        this.listeningTopic = Core.getTopic(this.listeningTopicName);
        this.publishingTopic = Core.getTopic(this.publishingTopicName);
        this.logger = Core.getLogger();
        this.listeningTopic.subscribe(this.subscriptionName,this).catch((error)=>{
            console.log('Error while subscribing');
            console.log(error);
        });
    }

    onReceive(message: QueueMessage) {
        console.log('Received message');
        console.log(message);
        this.validate(message);
        
    }
    
    onError(error: Error) {
        console.log('Received error');
        console.log(error);
    }


    async validate(message:QueueMessage): Promise<void> {
        const gtfsUploadMessage = GTFSPathwayUpload.from(message.data);
        console.log(gtfsUploadMessage.fileUploadPath);
        //https://xxxx-namespace.blob.core.windows.net/gtfspathways/2022%2FNOVEMBER%2F101%2Ffile_1669110207839_1518e1dd1d4741a19a5dbed8f9b8d0a1.zip
        // Get the file entity from url
        let fileEntity = await Core.getStorageClient()?.getFileFromUrl(gtfsUploadMessage.fileUploadPath!);
        if(fileEntity){
            // get the validation result
            let validationResult = await this.validateGTFSPathway(fileEntity);
            this.sendStatus(gtfsUploadMessage,validationResult);
        }
        else {
            this.sendStatus(gtfsUploadMessage,{isValid:false,validationMessage:'File entity not found'});
        }
    }

    validateGTFSPathway(file: FileEntity): Promise<ValidationResult> {

        return new Promise((resolve,reject)=>{

            try {
            // let content = file.getStream() // This gets the data stream of the file. This can be used for actual validation
            const fileName = unescape(file.fileName);
            console.log(fileName);
            if(fileName.includes('invalid')){
                // validation failed
                resolve({
                 isValid:   false,
                 validationMessage:'file name contains invalid'
                });
            }
            else {
                // validation is successful
                resolve({
                    isValid:true,
                    validationMessage:''
                });
            }
        }
        catch (e){
            reject(e);
        }
        });
    }

    private sendStatus(uploadMessage: GTFSPathwayUpload, result: ValidationResult){
        var statusMessage = GTFSPathwayValidation.from(uploadMessage);
        statusMessage.isValid = result.isValid;
        statusMessage.validationTime = 90; // This is hardcoded.
        statusMessage.validationMessage = result.validationMessage;
        this.publishingTopic.publish( QueueMessage.from(
            {
                message:"Validation complete",
                messageType:'gtfspathwayvalidation',
                data:statusMessage
            }
        ));
    }

}