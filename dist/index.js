"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const fastifyCookie = require('@fastify/cookie');
const fastifyjwt = require('@fastify/jwt');
const formbody = require('@fastify/formbody');
const path = require('path');
const fastify = (0, fastify_1.default)();
const index_1 = require("./routes/index");
const auth_1 = require("./routes/auth");
const hospital_1 = require("./routes/hospital");
fastify.register(require('@fastify/formbody'));
fastify.register(require("@fastify/view"), {
    engine: {
        ejs: require("ejs"),
    }
});
fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, '../public'),
});
fastify.register(fastifyCookie, {
    secret: "asda12iJSbSiqala392HJiod389",
    hook: 'preHandler',
});
fastify.register(fastifyjwt, {
    secret: "HMS-bEFiLJ69oa07uKq#YDO&Tincoff_AAAgp0-HMS",
});
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
fastify.listen({ host: '0.0.0.0', port: 8320 }, (err, address) => {
    if (err) {
        console.error(err);
    }
    for (let i = 0; i < 10 ** 10; i++) { }
    console.log(`Server listening...`);
});
(0, index_1.registerRoutesIndex)(fastify);
(0, auth_1.registerRoutesAuth)(fastify);
(0, hospital_1.registerRoutesHospital)(fastify);
