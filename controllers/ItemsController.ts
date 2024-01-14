import fastify, { FastifyInstance } from "fastify";
import SteamAPI, { OwnedGame } from 'type-steamapi';
import { PrismaClient, items } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

export class ItemsController {

    async index(req: any, res: any) {
        res.view("/templates/index.ejs", {

        });
    }                                                                                                                          
} 

