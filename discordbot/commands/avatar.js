const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { embedColor } = require('../../config.json');

module.exports = {
	name: 'awatar',
	description: 'Wysyłam twój awatar lub wybranej osoby.',
	options: [{
		name: 'użytkownik',
		type: 'USER',
		description: 'Użytkownik, którego awatar mam wysłać.',
		required: false,
	},
	{
		name: 'animowany',
		type: 'BOOLEAN',
		description: 'Czy awatar ma być animowany, jeśli to możliwe?',
		required: false,
	}],
	async execute(interaction, client) {
		const user = interaction.options.getUser('użytkownik');
		const boolean = interaction.options.getBoolean('animowany');
		let avatarUrl;
		let dynamic;

		if(boolean === null) dynamic = true;
		else dynamic = boolean;

		if(user) avatarUrl = user.displayAvatarURL({dynamic: dynamic, size: 512});
		else avatarUrl = interaction.user.displayAvatarURL({dynamic: dynamic, size: 512});

		const avatarEmbed = new MessageEmbed()
        .setColor(embedColor)
        .setAuthor(interaction.guild.name, client.user.displayAvatarURL({dynamic: true}), 'https://www.playergency.com')
		.setImage(avatarUrl);

		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setLabel('Link do awataru')
					.setStyle('LINK')
					.setURL(avatarUrl),
		);

		await interaction.reply({embeds: [avatarEmbed], components: [row]});
	},
};