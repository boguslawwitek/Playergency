const colors = require('colors/safe');

module.exports = {
	name: 'bot',
	description: 'Masz ochotę po udawać sztuczną inteligencje proszę bardzo pisz jako ja, nikomu nie powiem. Niestety ja nadal jestem zbyt głupi na pisanie bez twojej pomocy.',
	async execute(message, args) {
        const channel = message.mentions.channels.first();
        if(!channel) { message.author.send(`Nie można znaleźć kanału! (komenda: ${this.name})`); return; }
        if(args.length < 2) { message.author.send(`Niepoprawne użycie, za mało argumentów. (komenda: ${this.name})`); return; }
        
        const cloneArray = [...args];
        cloneArray.splice(0, 1);
        const botMsg = cloneArray.join(' ');

        if(botMsg > 2000) { message.author.send('Niepoprawne użycie, za długa wiadomość!'); return; }
        channel.send(botMsg);

		console.log(colors.red(`[${this.name}] ${message.author.tag} sent the message using a bot in #${channel.name}.`));
	},
};