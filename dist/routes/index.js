"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = void 0;
const ItemsController_1 = require("../controllers/ItemsController");
const AuthenticationController_1 = require("../controllers/AuthenticationController");
const itemsController = new ItemsController_1.ItemsController();
const authenticationController = new AuthenticationController_1.AuthenticationController();
function registerRoutes(fastify) {
    fastify.get('/', (req, res) => {
        itemsController.index(req, res);
    });
}
exports.registerRoutes = registerRoutes;
