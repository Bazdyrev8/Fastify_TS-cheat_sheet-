"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HospitalController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class HospitalController {
    async hub(req, res) {
        res.view("/templates/hospital/hub", {});
    }
    async hospital(req, res) {
        res.view("/templates/hospital/hospital", {});
    }
    async patient(req, res) {
        res.view("/templates/hospital/patient", {});
    }
    async transmitter(req, res) {
        res.view("/templates/hospital/transmitter", {});
    }
    async create_hub(req, res) {
        const { serial, device_name, hospital_name } = req.body;
        const ff = await prisma.hub_device.findMany({
            where: {
                number: serial,
                used: "False",
            }
        });
        res.redirect('/hub');
    }
}
exports.HospitalController = HospitalController;
