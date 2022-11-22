import { Core } from "nodets-ms-core";
import { ILoggable } from "nodets-ms-core/lib/core/logger/abstracts/ILoggable";
import { QueueMessage } from "nodets-ms-core/lib/core/queue";
import { ITopicSubscription } from "nodets-ms-core/lib/core/queue/abstracts/IMessage-topic";
import { Topic } from "nodets-ms-core/lib/core/queue/topic";
import { IValidator } from "./interface/iValidator";


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
        this.validate();
        
    }
    
    onError(error: Error) {
        console.log('Received error');
        console.log(error);
    }


    validate(): void {
        
    }

}