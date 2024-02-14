import Fastify, { FastifyRequest, FastifyReply } from 'fastify';
const fastifyCookie = require('@fastify/cookie')
import type { FastifyCookieOptions } from '@fastify/cookie'
const fastifyjwt = require('@fastify/jwt')
import { JWT } from '@fastify/jwt'
const formbody = require('@fastify/formbody')
const path = require('path')
const fastify = Fastify();

import { registerRoutesIndex } from './routes/index'
import { registerRoutesAuth } from './routes/auth'
import { registerRoutesHospital } from './routes/hospital'

declare module "fastify" {
    interface FastifyRequest {
        jwt: JWT
    }
    export interface FastifyInstance {
        authenticate: any;
    }
}

fastify.register(require('@fastify/formbody'));

fastify.register(require("@fastify/view"), {
    engine: {
        ejs: require("ejs"),
    }
});

fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, '../public'),
})

fastify.register(fastifyCookie, {
    secret: "asda12iJSbSiqala392HJiod389",
    hook: 'preHandler',
} as FastifyCookieOptions)

fastify.register(fastifyjwt, {
    secret: "HMS-bEFiLJ69oa07uKq#YDO&Tincoff_AAAgp0-HMS",
})

/////////////////////////////////////////
// fastify.addHook("onRequest", async (request, reply) => {
//     try {
//       await request.jwtVerify()
//     } catch (err) {
//       reply.send(err)
//     }
//   })

//   fastify.decorate("authenticate", async function(request, reply) {
//     try {
//       await request.jwtVerify()
//     } catch (err) {
//       reply.send(err)
//     }
//   })
/////////////////////////////////////////

fastify.listen({ host: '0.0.0.0', port: 8320 }, (err: any, address: any) => {
    if (err) {
        console.error(err);
    }
    for(let i=0; i < 10**10;i++){}
    console.log(`Server listening...`);
});

registerRoutesIndex(fastify);
registerRoutesAuth(fastify);
registerRoutesHospital(fastify);