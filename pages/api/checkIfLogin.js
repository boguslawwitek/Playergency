export default async (req, res) => {
    const client = req.discord;
    if(!req.session || !req.session.userID || !client) {
        res.status(200).json({login: false, user: null});
        return;
    }

    try {
        const user = await client.users.fetch(req.session.userID);
        res.status(200).json({login: true, user: {
            id: user.id,
            avatar: user.displayAvatarURL({dynamic: true}),
            tag: user.tag,
            username: user.username
        }});
    } catch(err) {
        console.log(err);
        res.status(200).json({login: true, user: null});
    }
}