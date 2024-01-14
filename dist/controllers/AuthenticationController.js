"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class AuthenticationController {
    registrationView(req, res) {
        res.view("/templates/authentication/register.ejs", {});
    }
    async registration(req, res) {
        const { name, email, password, } = req.body;
        const users = await prisma.users.findMany({
            where: {
                name: name
            }
        });
        if (users.length == 0) {
            await prisma.users.create({
                data: {
                    name: name,
                    email: email,
                    password: password
                }
            });
            req.session.auth = false;
        }
        console.log(req.session.auth, ' 1');
        res.view('/templates/index.ejs', {
            OwnedGames: req.session.ownedGames,
        });
    }
    loginView(req, res) {
        res.view("/templates/authentication/auth.ejs", {});
    }
    async login(req, res) {
        const { email, password } = req.body;
        const user = await prisma.users.findMany({
            where: {
                email: email,
                password: password
            }
        });
        if (user.length != 0) {
            req.session.auth = true;
        }
        else {
            req.session.auth = false;
        }
        res.view('/templates/index.ejs', {
            auth: req.session.auth,
            OwnedGames: req.session.ownedGames
        });
    }
}
exports.AuthenticationController = AuthenticationController;
