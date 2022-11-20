import { request } from "express";
import { IGtfsPathwaysService } from "./gtfs-pathways-validation-interface";

export class GtfsPathwaysService implements IGtfsPathwaysService {
    constructor() {

    }

    async getAllGtfsPathway(): Promise<PathwayVersions[]> {
        // get a gtfsPathway repository to perform operations with gtfsPathway
        const gtfsPathwayRepository = AppDataSource.getRepository(PathwayVersions);

        // load a gtfsPathway by a given gtfsPathway id.
        const gtfsPathways = await gtfsPathwayRepository.find();

        return gtfsPathways;
    }

    async getGtfsPathwayById(id: string): Promise<PathwayVersions | null> {
        // get a gtfsPathway repository to perform operations with gtfsPathway
        const gtfsPathwayRepository = AppDataSource.getRepository(PathwayVersions);

        // load a gtfsPathway by a given gtfsPathway id
        const gtfsPathway = await gtfsPathwayRepository.findOneBy({ id: Number.parseInt(id) });

        return gtfsPathway;

    }

    async createAGtfsPathway(pathwayInfo: PathwayVersions): Promise<PathwayVersions> {
        // get a gtfsPathway repository to perform operations with gtfsPathway
        const gtfsPathwayRepository = AppDataSource.getRepository(PathwayVersions);

        // create a real gtfsPathway object from gtfsPathway json object sent over http
        const newGtfsPathway = gtfsPathwayRepository.create(pathwayInfo);

        // save received gtfsPathway
        return await gtfsPathwayRepository.save(newGtfsPathway);
    }
}