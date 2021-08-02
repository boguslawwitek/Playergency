const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { embedColor } = require('../../config.json');
const wait = require('util').promisify(setTimeout);

module.exports = {
	name: 'ping',
	description: 'Sprawdź jaki jestem opóźniony.',
	async execute(interaction, client) {
        await interaction.reply(`Sprawdzam...`);
        const sent = await interaction.fetchReply();

        const pingEmbed = new MessageEmbed()
        .setColor(embedColor)
        .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
        .addFields({name: '💓 Bot', value: `${client.ws.ping}ms`}, {name: '⌛ API', value: `${sent.createdTimestamp - interaction.createdTimestamp}ms`});

        sent.edit({content: 'Pong!', embeds: [pingEmbed]});
	},
};