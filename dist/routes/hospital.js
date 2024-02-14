"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutesHospital = void 0;
const HospitalController_1 = require("../controllers/HospitalController");
const hospitalController = new HospitalController_1.HospitalController();
function registerRoutesHospital(fastify) {
    fastify.get("/hub", (req, res) => {
        hospitalController.hub(req, res);
    });
    fastify.get("/hospital", (req, res) => {
        hospitalController.hospital(req, res);
    });
    fastify.get("/patient", (req, res) => {
        hospitalController.patient(req, res);
    });
    fastify.post("/create_hub", (req, res) => {
        hospitalController.create_hub(req, res);
    });
}
exports.registerRoutesHospital = registerRoutesHospital;
