const Schema = require('mongoose').Schema

exports.OwnerSchema = new Schema({
    name: {
        type: String,
        unique: true,
    },
    password: String,
}, {collection: 'owner'});
