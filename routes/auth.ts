import fastify, { FastifyInstance } from "fastify";
import { request } from "https";
import { Interface } from "readline";

import { AuthController } from "../controllers/AuthController";
import { copyFileSync } from "fs";

const authController = new AuthController();

export function registerRoutesAuth(fastify: FastifyInstance) {

    fastify.get("/account", (req: any, res: any) => {
        authController.account(req, res, fastify);
    });

    fastify.get("/login", (req: any, res: any) => {
        authController.login(req, res, );
    });

    fastify.get("/signup", (req: any, res: any) => {
        authController.signup(req, res);
    });


    fastify.post("/auth", (req: any, res: any) => {
        authController.auth(req, res, fastify);
    });

    fastify.post("/register", (req: any, res: any) => {
        authController.register(req, res, fastify);
    });


    // Здесь регистрация для ГлавВРАЧА и ОБЫЧНОГО

    fastify.post("/registration", (req: any, res: any) => {
        authController.registration(req, res);
    });


    fastify.get('/signUP', (req, res) => {
        const token = fastify.jwt.sign({ "username": "token" });
        const decodetoken = fastify.jwt.decode(token);
        console.log("==============");
        console.log(token);
        console.log(decodetoken);
        res.setCookie('token', token, {
                path: '/',
                httpOnly: false,
                maxAge: 30,
                secure: false,
        }).redirect('/');  
    });

    // fastify.get("/protected", { onRequest: [fastify.authenticate] }, async (req, res) => {
    //         console.log("=---");
    //         res.redirect('/')
    //     }
    // )
    
}