import Easyviolet from 'easyviolet';
import express from 'express';
import path from 'node:path';
import url from 'node:url';
import fs from 'node:fs';

const app = express();
const ultraviolet = new Easyviolet({
  codec: 'plain'
});
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

app.use(ultraviolet.express(app));
app.use(express.static(path.join(__dirname, './static/'), { extensions: ['html'] }));
app.use((req, res) => res.send(fs.readFileSync(path.join(__dirname,'/static/assets/templates/404.html'))).status(404));

const server = app.listen(9000, () => {
  console.log(`Your Geode proxy is up and running on port ${server.address().port}, using NodeJS version ${process.version}`);
});