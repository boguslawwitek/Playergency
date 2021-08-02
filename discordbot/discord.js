const fs = require('fs');
const path = require('path');
const { Client, Collection, Intents } = require('discord.js');
const { discordBotToken, adminCommandsPrefix } = require('../config.json');
const colors = require('colors/safe');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES] });
const infoCommands = [];
const infoAdminCommands = [];
client.commands = new Collection();
client.adminCommands = new Collection();
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
const adminCommandFiles = fs.readdirSync(path.join(__dirname, 'commands', 'admin')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
	if(command.hasOwnProperty('options')) infoCommands.push({name: command.name, description: command.description, options: command.options});
    else infoCommands.push({name: command.name, description: command.description});
}

for (const file of adminCommandFiles) {
	const command = require(`./commands/admin/${file}`);
	client.adminCommands.set(command.name, command);
	infoAdminCommands.push({name: command.name, description: command.description});
}

client.once('ready', () => {
    console.log(colors.green(`Logged in as ${client.user.tag}!`));
	client.user.setActivity('Playergency.com', { type: 'COMPETING' });
});

client.on('messageCreate', async message => {
	if (!client.application?.owner) await client.application?.fetch();

	const prefix = adminCommandsPrefix;
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if(message.author.id === client.application?.owner.id || message.author.id === '250280270828273665') {
		if(!infoAdminCommands.find(c => c.name === command)) return;
			try {
				await client.adminCommands.get(command).execute(message, args, client, infoCommands);
				console.log(colors.blue(`${message.author.tag} in #${message.channel.name} usage '${prefix}${command}'.`));
			} catch (error) {
				console.error(error);
				await message.author.send('Wystąpił błąd podczas wywoływania tej komendy!');
			}
	}
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
	if (!client.commands.has(interaction.commandName)) return;

	console.log(colors.cyan(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction '${interaction.commandName}'.`));

    try {
		await client.commands.get(interaction.commandName).execute(interaction, client);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'Wystąpił błąd podczas wywoływania tej komendy! Jeśli problem będzie się powtarzał, poinformuj administracje.', ephemeral: true });
	}
});
  
client.login(discordBotToken);
module.exports = client;