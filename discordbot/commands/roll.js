const { MessageEmbed } = require('discord.js');
const { getRandomInt } = require('../utils');

module.exports = {
	name: 'rzut',
	description: 'Chciałbyś rzucić kostką, nie ma problemu, zrobię to za ciebie.',
	options: [{
		name: 'jak_duża',
		type: 'INTEGER',
		description: 'Ile oczek ma mieć twoja kostka? (1-1000)',
		required: false,
	},
    {
		name: 'ile_rzutów',
		type: 'INTEGER',
		description: 'Ile rzutów chciałbyś zrobić na raz? (1-10)',
		required: false,
	}],
	async execute(interaction, client, guildDB) {
        let randomNumber;
        let firstArg = interaction.options.getInteger('jak_duża');
        let secondArg = interaction.options.getInteger('ile_rzutów');

        if(!firstArg) firstArg = getRandomInt(1, 1000);
        if(!secondArg) secondArg = 1;
        
        if(firstArg <= 0 || firstArg > 1000 || secondArg <= 0 || secondArg > 10) {
            await interaction.reply({content: 'Niepoprawny zakres liczb.', ephemeral: true});
            return;
        }

		const rollEmbed = new MessageEmbed()
        .setColor(guildDB.config.defaultEmbedColor)
        .setAuthor(interaction.guild.name, client.user.displayAvatarURL({dynamic: true}), 'https://www.playergency.com');
        
        if(secondArg === 1) {
            randomNumber = getRandomInt(1, firstArg);
        }
        else {
            randomNumber = [];
            for(i=0; i<secondArg; i++) {    
                randomNumber.push(getRandomInt(1, firstArg));
            }
        }

        if(secondArg === 1) rollEmbed.setDescription(`Rzuciłem kostką **${firstArg}**, wylosowałem liczbę: **${randomNumber}**`);
        else rollEmbed.setDescription(`Rzuciłem **${secondArg}** razy, kostką **${firstArg}**, wylosowałem liczby: **${randomNumber.join('**, **')}**`);

		await interaction.reply({embeds: [rollEmbed]});
	},
};