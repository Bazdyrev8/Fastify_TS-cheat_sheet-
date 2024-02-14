"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutesIndex = void 0;
const IndexController_1 = require("../controllers/IndexController");
const AuthController_1 = require("../controllers/AuthController");
const HospitalController_1 = require("../controllers/HospitalController");
const indexController = new IndexController_1.IndexController();
const authController = new AuthController_1.AuthController();
const hospitalController = new HospitalController_1.HospitalController();
function registerRoutesIndex(fastify) {
    fastify.get('/', (req, res) => {
        indexController.index(req, res);
    });
    fastify.post("/hms/statistics", (req, res) => {
        indexController.recording_statistics(req, res);
    });
    // ИМИТАЦИЯ POST-запроса С ARDUINO
    fastify.get("/hms", (req, res) => {
        indexController.hms(req, res);
    });
}
exports.registerRoutesIndex = registerRoutesIndex;
