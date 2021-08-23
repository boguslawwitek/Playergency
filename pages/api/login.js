import config from '../../config.json';

export default async (req, res) => {
    const { code } = req.query;
    if(!code) { res.redirect('/login'); return; }

    try {
        const oauthResult = await fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            body: new URLSearchParams({
                client_id: config.discordClientId,
                client_secret: config.discordClientSecret,
                code,
                grant_type: 'authorization_code',
                redirect_uri: config.OAuth2RedirectURI,
                scope: config.OAuth2Scopes.join(' '),
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const oauthData = await oauthResult.json();

        if(oauthData.hasOwnProperty('access_token') && oauthData.hasOwnProperty('refresh_token') && oauthData.access_token && oauthData.refresh_token) {
            req.session.access_token = oauthData.access_token;
            req.session.refresh_token = oauthData.refresh_token;
        } else {
            req.session.destroy();
            res.redirect('/login'); 
            return;
        }

        const userFetch = await fetch('https://discord.com/api/users/@me', {
			headers: {
				authorization: `Bearer ${req.session.access_token}`,
			},
		})

        const userData = await userFetch.json();

        if(userData.hasOwnProperty('id') && userData.id) {
            req.session.userID = userData.id;
            res.redirect('/dashboard'); 
            return;
        } else {
            req.session.destroy();
            res.redirect('/login'); 
            return;
        }
    } catch (error) {
        console.error(error);
        res.redirect('/login');
        return;
    }
}