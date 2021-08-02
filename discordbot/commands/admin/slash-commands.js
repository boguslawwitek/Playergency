const { MessageEmbed } = require('discord.js');
const { embedColor } = require('../../../config.json');
const colors = require('colors/safe');

module.exports = {
	name: 'slash-commands',
	description: 'Aktualizuje wszystkie komendy z ukośnikiem.',
	async execute(message, args, client, infoCommands) {

		const commands = await client.application?.commands.set(infoCommands);
        const commandsNames = commands.map(c => c.name);
		console.log(colors.blue(`Registering ${commands.size} commands (${commandsNames.join(', ')}).`));

		const updateEmbed = new MessageEmbed()
        .setColor(embedColor)
        .setAuthor(message.guild.name, client.user.displayAvatarURL({dynamic: true}), 'https://www.playergency.com')
		.setDescription(`Zaktualizowano wszystkie **${commands.size}** komendy z ukośnikiem **(${commandsNames.join(', ')})**.`)

		message.author.send({embeds: [updateEmbed]});
	
	},
};