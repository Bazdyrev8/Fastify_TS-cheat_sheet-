import fastify, { FastifyInstance } from "fastify";
import { request } from "https";
import { Interface } from "readline";

import { IndexController } from "../controllers/IndexController";
import { AuthController } from "../controllers/AuthController";
import { HospitalController } from "../controllers/HospitalController";

const indexController = new IndexController();
const authController = new AuthController();
const hospitalController = new HospitalController();

export function registerRoutesIndex(fastify: FastifyInstance) {
    
    fastify.get('/', (req: any, res: any) => {
        indexController.index(req, res)
    });

    fastify.post("/hms/statistics", (req: any, res: any) => {
        indexController.recording_statistics(req, res);
    });

    // ИМИТАЦИЯ POST-запроса С ARDUINO
    fastify.get("/hms", (req: any, res: any) => {
        indexController.hms(req, res);
    });

}