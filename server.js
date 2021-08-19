const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const next = require('next');
const colors = require('colors/safe');
const { port, discordBotToken, sessionSecret } = require('./config.json');
if(!discordBotToken) throw new Error(colors.red('Discord Token not found!'));
if(!sessionSecret) throw new Error(colors.red('Session Secret not found!'));
const PORT = port ? port : '3000';
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const client = require('./discordbot/discord');
const { connectDB } = require('./database/database');

app.prepare().then(() => {
  const server = express();
  server.disable('x-powered-by');

  const clientP = connectDB();
  const sess = {
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 15552000000 },
    store: MongoStore.create({
      clientPromise: clientP,
      dbName: "testing",
      stringify: false,
      autoRemove: 'interval',
      autoRemoveInterval: 1
    })
  };
  server.use(session(sess));

  if (server.get('env') === 'production') {
    server.set('trust proxy', 1);
    sess.cookie.secure = true;
  }

  server.all('*', (req, res) => {
    req.discord = client;
    return handle(req, res);
  })

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(colors.yellow(`> Server listen on port: ${PORT}\n> http://localhost:${PORT}`));
  })
})