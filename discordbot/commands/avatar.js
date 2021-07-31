const { MessageEmbed } = require('discord.js');
const { embedColor } = require('../../config.json');

module.exports = {
	name: 'awatar',
	description: 'Wysyłam twój awatar lub wybranej osoby.',
	options: [{
		name: 'użytkownik',
		type: 'USER',
		description: 'Użytkownik, którego awatar mam wysłać.',
		required: false,
	}],
	async execute(interaction, client) {
		const user = interaction.options.getUser('użytkownik');

		const avatarEmbed = new MessageEmbed()
        .setColor(embedColor)
        .setAuthor(interaction.guild.name, client.user.displayAvatarURL({dynamic: true}), 'https://www.playergency.com')

		if(user) {
			avatarEmbed
			.setDescription(`[Link do awataru](${user.displayAvatarURL({dynamic: true})})`)
			.setImage(user.displayAvatarURL({dynamic: true}));
		} else {
			avatarEmbed
			.setDescription(`[Link do awataru](${interaction.user.displayAvatarURL({dynamic: true})})`)
			.setImage(interaction.user.displayAvatarURL({dynamic: true}));
		}

		await interaction.reply({embeds: [avatarEmbed], ephemeral: true});
	},
};