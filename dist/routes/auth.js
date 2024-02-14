"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutesAuth = void 0;
const AuthController_1 = require("../controllers/AuthController");
const authController = new AuthController_1.AuthController();
function registerRoutesAuth(fastify) {
    fastify.get("/account", (req, res) => {
        authController.account(req, res, fastify);
    });
    fastify.get("/login", (req, res) => {
        authController.login(req, res);
    });
    fastify.get("/signup", (req, res) => {
        authController.signup(req, res);
    });
    fastify.post("/auth", (req, res) => {
        authController.auth(req, res, fastify);
    });
    fastify.post("/register", (req, res) => {
        authController.register(req, res, fastify);
    });
    // Здесь регистрация для ГлавВРАЧА и ОБЫЧНОГО
    fastify.post("/registration", (req, res) => {
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
exports.registerRoutesAuth = registerRoutesAuth;
