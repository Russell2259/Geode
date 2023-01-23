import createBareServer from '@tomphttp/bare-server-node';
import express from 'express';
import { createServer } from 'node:http';
import { uvPath } from '@titaniumnetwork-dev/ultraviolet';
import { fileURLToPath } from 'url';
import { join } from 'node:path';
import * as url from 'url';
import { createRequire } from 'module';
import { createBareClient } from '@tomphttp/bare-client';

const require = createRequire(import.meta.url);
const path = require('path');

const bare = createBareServer('/bare/');
const app = express();

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

app.use(express.static(path.join(__dirname, './static/'), { extensions: ['html'] }));

app.use('/uv/', express.static(uvPath));

app.all('/files/*', async (req, res) => {
    let client;
    if (req.port) {
        client = await createBareClient(`${req.protocol}://${req.hostname}:${req.port}/bare/`);
    } else {
        client = await createBareClient(`${req.protocol}://${req.hostname}/bare/`);
    }

    const response = await client.fetch(req.path.replace('/files/', ''));

    response.blob()
        .then(data => {
            //res.send(Buffer.from(data.arrayBuffer()).toString('base64'));
            res.send(data);
        })
})

const server = createServer();

server.on('request', (req, res) => {
    if (bare.shouldRoute(req)) {
        bare.routeRequest(req, res);
    } else {
        app(req, res);
    }
});

server.on('upgrade', (req, socket, head) => {
    if (bare.shouldRoute(req)) {
        bare.routeUpgrade(req, socket, head);
    } else {
        socket.end();
    }
});

app.use((req, res) => {
    res.status(404);
    res.sendFile(join(fileURLToPath(new URL('./static/', import.meta.url)), '/assets/templates/404.html'));
});

server.on('listening', () => {
    const address = server.address();
    console.log(`Your Geode proxy is up and running on port ${address.port}, using NodeJS version ${process.version}`);
});

server.listen({
    port: 9000,
});