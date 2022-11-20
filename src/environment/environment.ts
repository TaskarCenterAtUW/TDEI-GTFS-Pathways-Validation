import dotenv from 'dotenv';
dotenv.config();
/**
 * Contains all the configurations required for setting up the core project
 * While most of the parameters are optional, appInsights connection is 
 * a required parameter since it is auto imported in the `tdei_logger.ts`
 */
export const environment = {
    appName: process.env.npm_package_name,
    eventBus: {
        connectionString: process.env.EventBusConnection,
        uploadTopic: process.env.UploadTopic,
        uploadSubscription: process.env.UploadSubscription,
        validationTopic: process.env.ValidationTopic,
        validationSubscription: process.env.ValidationSubscription
    },
    appPort: parseInt(process.env.APPLICATION_PORT as string)
}