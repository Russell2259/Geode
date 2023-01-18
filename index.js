import createBareServer from '@tomphttp/bare-server-node';
import express from 'express';
import { createServer } from 'node:http';
import { uvPath } from '@titaniumnetwork-dev/ultraviolet';
import { fileURLToPath } from 'url';
import { join } from 'node:path';
import * as url from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const path = require('path');

const bare = createBareServer('/bare/');
const app = express();

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

app.use(express.static(path.join(__dirname, './static/'), { extensions: ['html'] }));

app.use('/uv/', express.static(uvPath));

app.use((req, res) => {
    res.status(404);
    res.sendFile(join(fileURLToPath(new URL('./static/', import.meta.url)), '/assets/templates/404.html'));
});

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

server.on('listening', () => {
    const address = server.address();
    console.log(`Your Geode proxy is up and running on port ${address.port}, using NodeJS version ${process.version}`);
});

server.listen({
    port: 9000,
});
