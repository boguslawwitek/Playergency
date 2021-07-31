import data from '../../../config.json';
const discordGuildID = data.discordGuildID;

export default async (req, res) => {
    const client = req.discord;
    if(!client || !discordGuildID) {
        res.status(404).json({ memberCount: 0, err: null });
        return;
    }

    try {
        const guild = client.guilds.cache.get(discordGuildID);
        const members = await guild.members.fetch();
        const memberCount = members.size;
    
        res.status(200).json({ memberCount, err: null});
    } catch(err) {
        res.status(404).json({ memberCount: 0, err });
    }
}