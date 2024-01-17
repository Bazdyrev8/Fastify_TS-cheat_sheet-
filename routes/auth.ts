import fastify, { FastifyInstance } from "fastify";
import { AuthController } from "../controllers/AuthController";
import { request } from "https";
import { Interface } from "readline";

const authController = new AuthController();

export function registerRoutes(fastify: FastifyInstance) {

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