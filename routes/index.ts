import fastify, { FastifyInstance } from "fastify";
import { ItemsController } from "../controllers/ItemsController";
import { request } from "https";
import { Interface } from "readline";

import { AuthController } from "../controllers/AuthController";
const authController = new AuthController();

const itemsController = new ItemsController();

export function registerRoutes(fastify: FastifyInstance) {

    fastify.get('/', (req: any, res: any) => {
        itemsController.index(req, res)
    });

    fastify.post("/hms/statistics", (req: any, res: any) => {
        itemsController.recording_statistics(req, res);
    });

    // ИМИТАЦИЯ POST-запроса С ARDUINO
    fastify.get("/hms", (req: any, res: any) => {
        itemsController.hms(req, res);
    });



    fastify.get("/account", (req: any, res: any) => {
        authController.account(req, res);
    });

    fastify.get("/logIN", (req: any, res: any) => {
        authController.logIN(req, res);
    });


    // Регистрация

    fastify.get("/register", (req: any, res: any) => {
        authController.register(req, res);
    });

    fastify.post("/auth", (req: any, res: any) => {
        authController.auth(req, res);
    });

    // Здесь регистрация для ГлавВРАЧА и ОБЫЧНОГО

    fastify.post("/registration", (req: any, res: any) => {
        authController.registration(req, res);
    });

}