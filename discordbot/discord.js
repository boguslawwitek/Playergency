const fs = require('fs');
const path = require('path');
const { Client, Collection, Intents } = require('discord.js');
const { discordBotToken } = require('../config.json');
const colors = require('colors/safe');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES] });
const infoCommands = [];
client.commands = new Collection();
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
	if(command.hasOwnProperty('options')) infoCommands.push({name: command.name, description: command.description, options: command.options});
    else infoCommands.push({name: command.name, description: command.description});
}

client.once('ready', () => {
    console.log(colors.green(`Logged in as ${client.user.tag}!`));
});

client.on('messageCreate', async message => {
	if (!client.application?.owner) await client.application?.fetch();

	if (message.content.toLowerCase() === '!deploy' && (message.author.id === client.application?.owner.id || message.author.id === '250280270828273665')) {
		const commands = await client.application?.commands.set(infoCommands);
        const commandsNames = commands.map(c => c.name);
		console.log(colors.blue(`Registering ${commands.size} commands (${commandsNames.join(', ')}).`));
	}
});

client.on('interactionCreate', async interaction => {
    console.log(colors.blue(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`));

    if (!interaction.isCommand()) return;
	if (!client.commands.has(interaction.commandName)) return;

    try {
		await client.commands.get(interaction.commandName).execute(interaction, client);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'Wystąpił błąd podczas wywoływania tej komendy! Jeśli problem będzie się powtarzał, poinformuj administracje.', ephemeral: true });
	}
});
  
client.login(discordBotToken);
module.exports = client;