import config from '../../config.json';

export default async (req, res) => {
    const client = req.discord;
    if(!req.session || !req.session.userID || !client) {
        res.status(200).json({login: false, user: null});
        return;
    }

    try {
        let bool = false;
        const user = await client.users.fetch(req.session.userID);
        const guild = await client.guilds.fetch(config.discordGuildID);
        if(!guild.available) bool = false;
        let guildMember;

        try {
            guildMember = await guild.members.fetch(req.session.userID);
            if(guildMember && guildMember.hasOwnProperty('user')) bool = true;
        } catch {
            bool = false;
        }

        res.status(200).json({login: true, user: {
            id: user.id,
            avatar: user.displayAvatarURL({dynamic: true}),
            tag: user.tag,
            username: user.username,
            guildMember:  bool
        }});
    } catch(err) {
        console.log(err);
        res.status(200).json({login: true, user: null});
    }
}