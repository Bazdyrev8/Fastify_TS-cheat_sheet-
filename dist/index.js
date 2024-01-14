"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./routes/index");
const fastify = require("fastify")();
const fastifySession = require('@fastify/session');
const fastifyCookie = require('@fastify/cookie');
const formbody = require('@fastify/formbody');
fastify.register(require("@fastify/view"), {
    engine: {
        ejs: require("ejs"),
    }
});
// function plugin(server: any, next?: any) {
//         // register the required plugins
//         server.register(formbody)
//         server.register(fastifyCookie)
//         server.register(fastifySession, {
//                 cookieName: 'sessionId',
//                 secret: 'a secret with minimum length of 32 characters',
//                 cookie: { secure: false },
//                 // expires: 1800000
//         });
//         if (next != undefined) next();
// }
// plugin(fastify);
fastify.listen({ host: '0.0.0.0', port: 8310 }, (err, address) => {
    if (err) {
        console.error(err);
    }
    console.log(`Server listening...`);
});
(0, index_1.registerRoutes)(fastify);
