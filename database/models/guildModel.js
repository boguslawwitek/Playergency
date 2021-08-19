const mongoose = require('mongoose');
const { Schema } = mongoose;

const guildSchema = new Schema({
    guildID: String,
    config: {
        admins: [{userID: String, permissions: Array}],
        adminCommandsPrefix: { type: String, default: '!' },
        defaultEmbedColor: { type: String, default: '#d50000' },
    },
    date: { type: Date, default: Date.now }
}, { collection: 'guilds' });

const Guild = mongoose.model('Guild', guildSchema);
module.exports = Guild;