const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { token } = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();

const port = 6999;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(token);

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    req.discord = client;

    handle(req, res, parsedUrl);

  }).listen(port, (err) => {
    if (err) throw err
        console.log(`> Server listen on port: ${port}`);
  })
})