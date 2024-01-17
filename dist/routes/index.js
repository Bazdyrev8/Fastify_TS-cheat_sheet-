"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = void 0;
const ItemsController_1 = require("../controllers/ItemsController");
const AuthController_1 = require("../controllers/AuthController");
const authController = new AuthController_1.AuthController();
const itemsController = new ItemsController_1.ItemsController();
function registerRoutes(fastify) {
    fastify.get('/', (req, res) => {
        itemsController.index(req, res);
    });
    fastify.post("/hms/statistics", (req, res) => {
        itemsController.recording_statistics(req, res);
    });
    // ИМИТАЦИЯ POST-запроса С ARDUINO
    fastify.get("/hms", (req, res) => {
        itemsController.hms(req, res);
    });
    fastify.get("/account", (req, res) => {
        authController.account(req, res);
    });
    fastify.get("/logIN", (req, res) => {
        authController.logIN(req, res);
    });
    // Регистрация
    fastify.get("/register", (req, res) => {
        authController.register(req, res);
    });
    fastify.post("/auth", (req, res) => {
        authController.auth(req, res);
    });
    // Здесь регистрация для ГлавВРАЧА и ОБЫЧНОГО
    fastify.post("/registration", (req, res) => {
        authController.registration(req, res);
    });
}
exports.registerRoutes = registerRoutes;
