import express from "express";
import bodyParser from "body-parser";
import { IController } from "./controller/interface/iController";
import helmet from "helmet";
import { GTFSPathwaysValidator } from "./controller/gtfs-pathways-validator";

class App {
    public app: express.Application;
    public port: number;
    private validator: GTFSPathwaysValidator;

    constructor(controllers: IController[], port: number) {
        this.app = express();
        this.port = port;
        
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.validator = new GTFSPathwaysValidator();
    }

    private initializeMiddlewares() {
        this.app.use(helmet());
        this.app.use(bodyParser.json());
    }

    private initializeControllers(controllers: IController[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;