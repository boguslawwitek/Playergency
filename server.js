const express = require('express');
const next = require('next');
const colors = require('colors/safe');
const { port, discordBotToken } = require('./config.json');
if(!discordBotToken) return new Error(colors.red('Discord Token not found!'));
const PORT = port ? port : '3000';
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const client = require('./discordbot/discord');

app.prepare().then(() => {
  const server = express();

  server.all('*', (req, res) => {
    req.discord = client;
    return handle(req, res);
  })

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(colors.yellow(`> Server listen on port: ${PORT}\n> http://localhost:${PORT}`));
  })
})