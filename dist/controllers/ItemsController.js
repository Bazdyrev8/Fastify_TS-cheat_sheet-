"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ItemsController {
    async index(req, res) {
        res.view("/templates/index.ejs", {});
    }
    async recording_statistics(req, res) {
        const { temp, pulse } = req.body;
        console.log(req.body);
        console.log(temp, "-----", pulse);
        await prisma.statistics_pulse.create({
            data: {
                pulse: Number(pulse),
                time: new Date(),
                patient_id: 1,
            }
        });
        res.sendStatus(200);
    }
    // СТРАНИЦА ИМИТАЦИИ POST-запроса С ARDUINO
    async hms(req, res) {
        res.view('hms');
    }
}
exports.ItemsController = ItemsController;
