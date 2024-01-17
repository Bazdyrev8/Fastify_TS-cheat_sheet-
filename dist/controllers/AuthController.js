"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class AuthController {
    // view 
    async logIN(req, res) {
        res.view('account/logIN');
    }
    async register(req, res) {
        res.view('account/register');
    }
    async account(req, res) {
        // console.log(req.session.auth);
        // if (req.session.auth != true) {
        //     res.view('account/logIN');
        // };
        res.view('account/account', {
        // auth: req.session.auth,
        });
    }
    // POST Registration
    async registration(req, res) {
        const { username, email, password, serialNumber, } = req.body;
        console.log(serialNumber);
        const selectUsername = await prisma.users.findMany({
            where: {
                username: username,
            },
        });
        if (selectUsername.length != 0) {
            res.redirect('/');
        }
        else {
            const selectDevise = await prisma.serialNumber_device.findMany({
                where: {
                    number: serialNumber,
                },
            });
            await prisma.users.create({
                data: {
                    username: username,
                    email: email,
                    password: password,
                }
            });
            const selectUsernameID = await prisma.users.findMany({
                where: {
                    username: username,
                    email: email,
                    password: password,
                },
            });
            await prisma.serialNumber_device.update({
                where: {
                    id: selectDevise[0].id,
                },
                data: {
                    user_id: selectUsernameID[0].id,
                }
            });
            req.session.auth = true;
            res.redirect('/');
        }
    }
    // POST AUTH
    async auth(req, res) {
        const { username, password } = req.body;
        res.redirect('/');
    }
}
exports.AuthController = AuthController;
