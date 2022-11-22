// import { Request } from "express";
// import express from "express";
// import { IController } from "./interface/iController";
// import { GtfsPathwaysService } from "../service/gtfs-pathways-service"; // what is this?
// import { IGtfsPathwaysService } from "../service/gtfs-pathways-service-interface"; // what is this?

import { Core } from "nodets-ms-core";
import { ILoggable } from "nodets-ms-core/lib/core/logger/abstracts/ILoggable";
import { AuditEvent } from "nodets-ms-core/lib/core/logger/model/audit_event";
import { QueueMessage } from "nodets-ms-core/lib/core/queue";
import { ITopicSubscription } from "nodets-ms-core/lib/core/queue/abstracts/IMessage-topic";
import { Topic } from "nodets-ms-core/lib/core/queue/topic";
import { IValidator } from "./interface/iValidator";

// class GtfsPathwaysController implements IController {
//     public path = '/gtfspathways';
//     public router = express.Router();
//     private gtfsPathwaysService!: IGtfsPathwaysService;
//     constructor() {
//         this.intializeRoutes();
//         this.gtfsPathwaysService = new GtfsPathwaysService();
//     }

//     public intializeRoutes() {
//         this.router.get(this.path, this.getAllGtfsPathway);
//         this.router.get(`${this.path}\:id`, this.getGtfsPathwayById);
//         this.router.post(this.path, this.createAGtfsPathway);
//     }

//     getAllGtfsPathway = async (request: Request, response: express.Response) => {
//         // load gtfsPathways
//         const gtfsPathways = await this.gtfsPathwaysService.getAllGtfsPathway();

//         // return loaded gtfsPathways
//         response.send(gtfsPathways);
//     }

//     getGtfsPathwayById = async (request: Request, response: express.Response) => {

//         // load a gtfsPathway by a given gtfsPathway id
//         const gtfsPathway = await this.gtfsPathwaysService.getGtfsPathwayById(request.params.id);

//         // if gtfsPathway was not found return 404 to the client
//         if (!gtfsPathway) {
//             response.status(404);
//             response.end();
//             return;
//         }

//         // return loaded gtfsPathway
//         response.send(gtfsPathway);
//     }

//     createAGtfsPathway = async (request: Request, response: express.Response) => {
//         var newGtfsPathway = await this.gtfsPathwaysService.createAGtfsPathway(request.body);

//         // return saved gtfsPathway back
//         response.send(newGtfsPathway);
//     }
// }

// export default GtfsPathwaysController;

export class GTFSPathwaysValidator implements IValidator, ITopicSubscription {

    readonly listeningTopicName = 'gtfs_pathways_upload';
    readonly publishingTopicName = 'gtfs_pathways_validation';
    readonly subscriptionName = '';
    listeningTopic: Topic;
    publishingTopic: Topic;
    logger: ILoggable;

    constructor(){
        Core.initialize();
        this.listeningTopic = Core.getTopic(this.listeningTopicName);
        this.publishingTopic = Core.getTopic(this.publishingTopicName);
        this.logger = Core.getLogger();
        this.listeningTopic.subscribe(this.subscriptionName,this);
    }

    onReceive(message: QueueMessage) {
        console.log('Received message');
    }
    
    onError(error: Error) {
        console.log('Received error');
    }


    validate(): void {
        
    }

}