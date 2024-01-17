import fastify, { FastifyInstance } from "fastify";
import { PrismaClient, } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

export class ItemsController {

    async index(req: any, res: any) {
        res.view("/templates/index.ejs", {

        });
    }            
    
    async recording_statistics(req: any, res: any) {
        const {temp, pulse} = req.body;
        console.log(req.body);
        console.log(temp, "-----", pulse);

        await prisma.statistics_pulse.create({
            data: {
                pulse: Number(pulse),
                time:  new Date(),
                patient_id: 1,
            }
        });
        res.sendStatus(200);
    }

    // СТРАНИЦА ИМИТАЦИИ POST-запроса С ARDUINO
    async hms(req: any, res: any){
        res.view('hms');
    }
} 

