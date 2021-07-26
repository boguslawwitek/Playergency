const express = require('express');
const next = require('next');
const { port, discordBotToken } = require('./config.json');

const PORT = port ? port : '3000';
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const colors = require('colors/safe');

app.prepare().then(() => {
  const server = express();

  server.all('*', (req, res) => {
    if(discordBotToken) {
      const client = require('./discord');
      req.discord = client;
    } else req.discord = null;

    return handle(req, res);
  })

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(colors.yellow(`> Server listen on port: ${PORT}\n> http://localhost:${PORT}`));
  })
})