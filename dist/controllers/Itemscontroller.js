"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ItemsController {
    async index(req, res) {
        res.view("/templates/index.ejs", {});
    }
    async show(req, res) {
    }
}
exports.ItemsController = ItemsController;
