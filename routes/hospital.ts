import fastify, { FastifyInstance } from "fastify";
import { request } from "https";
import { Interface } from "readline";

import { HospitalController } from "../controllers/HospitalController";

const hospitalController = new HospitalController();

export function registerRoutesHospital(fastify: FastifyInstance) {

    fastify.get("/hub", (req: any, res: any) => {
        hospitalController.hub(req, res);
    });

    fastify.get("/hospital", (req: any, res: any) => {
        hospitalController.hospital(req, res);
    });

    fastify.get("/patient", (req: any, res: any) => {
        hospitalController.patient(req, res);
    });

    fastify.post("/create_hub", (req: any, res: any) => {
        hospitalController.create_hub(req, res);
    });

}