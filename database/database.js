const mongoose = require('mongoose');
const { mongoURI } = require('../config.json');
const colors = require('colors/safe');

if(!mongoURI) throw new Error(colors.red('mongoURI not found!'));

exports.connectDB = function connectDB() {
    const clientP = mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(m => m.connection.getClient());
    
    const db = mongoose.connection;
    
    db.on('error', console.error.bind(console, colors.magenta('[MongoDB] connection error:')));
    db.once('open', function() {
      console.log(colors.magenta('[MongoDB] connection open'));
    });

    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            console.log(colors.magenta('\n[MongoDB] Mongoose default connection is disconnected due to application termination'));
            process.exit(0);
        });
    });

    return clientP;
}