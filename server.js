const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { discordBotToken } = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();

const port = 6999;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

if(discordBotToken) {
  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  client.login(discordBotToken);
}

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    if(discordBotToken) req.discord = client;
    else req.discord = null;

    handle(req, res, parsedUrl);

  }).listen(port, (err) => {
    if (err) throw err
        console.log(`> Server listen on port: ${port}\n> http://localhost:${port}`);
  })
})