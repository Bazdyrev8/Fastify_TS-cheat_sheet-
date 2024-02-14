import fastify, { FastifyInstance } from "fastify";
import { PrismaClient, } from '@prisma/client';
import { JWT } from '@fastify/jwt'
import { userInfo } from "os";
import { UserBans } from "type-steamapi";

const prisma: PrismaClient = new PrismaClient();

export class AuthController {

    // view 
    async login(req: any, res: any,) {
        res.view('/templates/account/login', {

        });
    }

    async signup(req: any, res: any,) {
        console.log("===================");
        res.view('/templates/account/signup', {

        });
    }

    async account(req: any, res: any, fastify: FastifyInstance) {
        if (req.cookies.token == undefined) {
            res.redirect("/login");
        }else{

        const decodetoken = Object(fastify.jwt.decode(req.cookies.token));
        console.log("_________________________");
        console.log(decodetoken.username);
        console.log(req.cookies.token);
        
        const user_id = await prisma.users.findFirst({
            where:{
                username: decodetoken.username,
            }
        });

        console.log(user_id?.id);
        const hub = await prisma.hub_device.findMany({
            where:{
                users_id: user_id?.id,
            }
        });
        console.log(hub);
        res.view("/templates/account/account", {
            hub: hub
        });
        }
    }

    async auth(req: any, res: any, fastify: FastifyInstance) {
        const { username, password } = req.body;
        // console.log(req.body);
        const selectUsername = await prisma.users.findMany({
            where: {
                username: username,
                password: password,
            },
        });

        if (selectUsername.length == 0) {
            res.redirect("/login");
        } else {

            const token = fastify.jwt.sign({ "username": username });

            res.setCookie('token', token, {
                path: '/',
                httpOnly: false,
                maxAge: 30,
                secure: false,
            }).redirect('/account');
        }
    }

    async register(req: any, res: any, fastify: FastifyInstance) {
        const { username, password } = req.body;
        console.log(req.body);
        console.log(username);
        console.log(password);
        const selectUsername = await prisma.users.findMany({
            where: {
                username: username,
            },
        });

        console.log(selectUsername);

        if (selectUsername.length != 0) {
            console.log("======");
            res.redirect("/login");
        } else {

            await prisma.users.create({
                data: {
                    username: String(username),
                    password: String(password),
                    role: null,
                }
            });

            const token = fastify.jwt.sign({ "username": username });

            res.setCookie('token', token, {
                path: '/',
                httpOnly: false,
                maxAge: 30,
                secure: false,
            }).redirect('/account');
        }
    }

    // POST Registration
    async registration(req: any, res: any,) {
        const { username, email, password, serialNumber, } = req.body;
        console.log(serialNumber);

        const selectUsername = await prisma.users.findMany({
            where: {
                username: username,
            },
        });

        if (selectUsername.length != 0) {
            res.redirect('/');
        } else {

            // const selectDevise = await prisma.serialNumber_device.findMany({
            //     where: {
            //         number: serialNumber,
            //     },
            // });

            await prisma.users.create({
                data: {
                    username: username,
                    password: password,
                }
            });

            const selectUsernameID = await prisma.users.findMany({
                where: {
                    username: username,
                    password: password,
                },
            });

            // await prisma.serialNumber_device.update({
            //     where: {
            //         id: selectDevise[0].id,
            //     },
            //     data: {
            //         user_id: selectUsernameID[0].id,
            //     }
            // });
            req.session.auth = true;

            res.redirect('/');
        }
    }

    // POST AUTH

}