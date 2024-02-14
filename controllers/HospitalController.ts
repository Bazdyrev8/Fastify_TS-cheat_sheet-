import fastify, { FastifyInstance } from "fastify";
import { PrismaClient,} from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

export class HospitalController {
    async hub(req: any, res: any,) {
        res.view("/templates/hospital/hub", {
            
        });
    }

    async hospital(req: any, res: any,) {
        res.view("/templates/hospital/hospital", {
            
        });
    }
    async patient(req: any, res: any,) {
        res.view("/templates/hospital/patient", {
            
        });
    }
    async transmitter(req: any, res: any,) {
        res.view("/templates/hospital/transmitter", {
            
        });
    }

    async create_hub(req: any, res: any,) {
        const {serial, device_name, hospital_name} = req.body;
        const ff = await prisma.hub_device.findMany({
            where:{
                number: serial,
                used: "False",
            }
        });
        
        res.redirect('/hub');
    }
}