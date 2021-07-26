import data from '../../config.json';
const discordGuildID = data.discordGuildID;

export default (req, res) => {
    const client = req.discord;

    if(client) {
        if(discordGuildID) {
            client.guilds.fetch(discordGuildID)
            .then(guild => {
                guild.members.fetch()
                .then(members => {
                    const memberCount = members.size;
                    res.status(200).json({ memberCount, err: null});
                })
                .catch(err => {
                    res.status(404).json({ memberCount: 0, err });
                })
            })
            .catch(err => {
                res.status(404).json({ memberCount: 0, err });
            })
        } else {
            res.status(404).json({ memberCount: 0, err: null });
        }
    } else {
        res.status(404).json({ memberCount: 0, err: null });
    }
}