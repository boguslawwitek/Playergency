import data from '../../config.json';
const discordGuildID = data.discordGuildID;

export default async (req, res) => {
	const GuildModel = req.GuildModel;
	if(!GuildModel || !discordGuildID) {
        res.status(404).json({ loginBgUrl: null, err: null });
        return;
    }

	try {
		const query = await GuildModel.find({guildID: discordGuildID});
		if(!query[0]) { res.status(200).json({ loginBgUrl: null, err: null }); return; }
		
		res.status(200).json({ loginBgUrl: query[0].config.loginBgUrl, err: null });
	} catch (err) {
		res.status(200).json({ loginBgUrl: null, err });
	}
}