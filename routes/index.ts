import fastify, { FastifyInstance } from "fastify";
import { ItemsController } from "../controllers/ItemsController";
import { request } from "https";
import { Interface } from "readline";

const itemsController = new ItemsController();

export function registerRoutes(fastify: FastifyInstance) {

    fastify.get('/',(req: any, res: any) => {
        itemsController.index(req, res)
    });
}