import { discordGuildID } from '../../config.json';

export default (req, res) => {
    const client = req.discord;
    client.guilds.fetch(discordGuildID)
        .then(guild => {
            const memberCount = guild.memberCount;
            res.status(200).json({ memberCount, err: null});
        })
        .catch(err => {
            res.status(404).json({ memberCount: 0, err });
        })
}