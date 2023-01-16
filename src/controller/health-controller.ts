import express, { Request } from "express";
import { IController } from "./interface/iController";

class HealthController implements IController {
    public path = '/health';
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(`${this.path}/ping`, this.getping);
        this.router.post(`${this.path}/ping`, this.getping);
        this.router.get(`${this.path}/meta`, this.getMetadata);
    }

    getping = async (request: Request, response: express.Response) => {

        response.send("I'm healthy !!");
    }

    getMetadata = async (request: Request, response: express.Response) => {
        const metadata = {
            version: process.env.npm_package_version,
            package: process.env.npm_package_name
        };
        response.send(metadata);
    }

}

const healthController = new HealthController();
export default healthController;