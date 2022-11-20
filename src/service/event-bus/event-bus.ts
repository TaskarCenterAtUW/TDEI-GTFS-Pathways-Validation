import { GtfsPathwaysValidationModel } from "../../model/gtfs-pathways-validation-model";
import { GtfsPathwaysService } from "../gtfs-pathways-validation-service";
import { IGtfsPathwaysService } from "../gtfs-pathways-validation-interface";
import { IEventBusServiceInterface } from "./interface/event-bus-service";
import { AzureServiceBusProvider } from "./provider/azure-service-bus";

export class EventBusService implements IEventBusServiceInterface {
    private azureServiceBusProvider!: AzureServiceBusProvider;
    private gtfsPathwayService!: IGtfsPathwaysService;

    constructor() {
        this.azureServiceBusProvider = new AzureServiceBusProvider();
        this.gtfsPathwayService = new GtfsPathwaysService();
        this.azureServiceBusProvider.initialize();
    }

    // function to handle messages
    private processUpload = async (messageReceived: any) => {
        var gtfsFlexUploadModel = messageReceived.body.data as GtfsPathwaysValidationModel;
        console.log(`Received message: ${JSON.stringify(gtfsFlexUploadModel)}`);
    };

    private copy(target: any, source: any): any {
        return Object.keys(target).forEach(key => {
            if (source[key] != undefined) {
                target[key] = source[key];
            }
        }
        );
    }
    // function to handle any errors
    private processUploadError = async (error: any) => {
        console.log(error);
    };

    subscribeUpload(): void {
        this.azureServiceBusProvider.subscribe({
            processMessage: this.processUpload,
            processError: this.processUploadError
        });
    }
}