const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'serwer',
	description: 'Wysyłam informacje o serwerze.',
	async execute(interaction, client, guildDB) {
        const guildCreatedAtDate = interaction.guild.createdAt.toLocaleDateString("pl-PL", { year: "numeric", month: "2-digit", day: "2-digit" });
		const verificationLevels = {'NONE': 0, 'LOW': 1, 'MEDIUM': 2, 'HIGH': 3, 'VERY_HIGH': 4};

        const members = await interaction.guild.members.fetch({withPresences: true});
        const memberCount = members.size;
        const onlineCount = members.filter(m => { if(m.presence) if(m.presence.status !== 'offline') return m; else return null; }).size;
        const boostedCount = members.filter(m => m.premiumSince).size;

		const channels = interaction.guild.channels.cache;
		const textChannels = channels.filter(ch => ch.type === 'GUILD_TEXT').size;
		const voiceChannels = channels.filter(ch => ch.type === 'GUILD_VOICE').size;
		const categoryChannels = channels.filter(ch => ch.type === 'GUILD_CATEGORY').size;
		const allChannels = textChannels + voiceChannels + categoryChannels;

		const roles = await interaction.guild.roles.fetch();
		const rolesCount = roles.size;
    
        const serverEmbed = new MessageEmbed()
        .setColor(guildDB.config.defaultEmbedColor)
        .setAuthor(interaction.guild.name, client.user.displayAvatarURL({dynamic: true}), 'https://www.playergency.com')
        .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
        .addFields(
            { name: '🆔 ID serwera', value: interaction.guildId },
            { name: '📆 Utworzenie serwera', value: guildCreatedAtDate},
            { name: '👑 Właściciel', value: `<@${interaction.guild.ownerId}>` },
            { name: '🕵️ Twórca bota', value: `<@250280270828273665>` },
            { name: `👥 Członkowie (${memberCount})`, value: `**Dostępnych** ${onlineCount}\n**Boosterów** ${boostedCount} ✨` },
            { name: `💬 Kanały (${allChannels})`, value: `**Tekstowych** ${textChannels}\n**Głosowych** ${voiceChannels}\n**Kategorii** ${categoryChannels}` },
            { name: '👥 Role', value: `${rolesCount}` },
            { name: '💻 Inne', value: `**Poziom weryfikacji:** ${verificationLevels[interaction.guild.verificationLevel]}` },
            { name: '🌐 Strona internetowa', value: 'https://www.playergency.com' }
        );

		await interaction.reply({embeds: [serverEmbed]});
	},
};