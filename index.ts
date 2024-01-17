import { registerRoutes } from './routes/index'
const fastify = require("fastify")();
const fastifySession = require('@fastify/session')
const fastifyCookie = require('@fastify/cookie')
const formbody = require('@fastify/formbody')
const path = require('node:path')

fastify.register(require("@fastify/view"), {
        engine: {
                ejs: require("ejs"),
        }
});

fastify.register(require('@fastify/static'), {
        root: path.join(__dirname, 'resources'),
        prefix: '/public/', // optional: default '/'
        constraints: { host: 'example.com' } // optional: default {}
})

fastify.listen({ host: '0.0.0.0', port: 8320 }, (err: any, address: any) => {
        if (err) {
                console.error(err);
        }

        console.log(`Server listening...`);
});

registerRoutes(fastify);