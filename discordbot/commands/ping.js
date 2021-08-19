const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	name: 'ping',
	description: 'Sprawdź jaki jestem opóźniony.',
	async execute(interaction, client, guildDB) {
        await interaction.reply(`Sprawdzam...`);
        const sent = await interaction.fetchReply();

        const pingEmbed = new MessageEmbed()
        .setColor(guildDB.config.defaultEmbedColor)
        .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
        .addFields({name: '💓 Bot', value: `${client.ws.ping}ms`}, {name: '⌛ API', value: `${sent.createdTimestamp - interaction.createdTimestamp}ms`});

        sent.edit({content: 'Pong!', embeds: [pingEmbed]});
	},
};