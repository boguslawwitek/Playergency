const { Client } = require('discord.js');
const client = new Client();
const { discordBotToken } = require('./config.json');
const colors = require('colors/safe');

if(!discordBotToken) return;

client.on('ready', () => {
    console.log(colors.green(`Logged in as ${client.user.tag}!`));
});
  
client.login(discordBotToken);

module.exports = client;