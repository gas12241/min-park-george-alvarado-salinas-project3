const Schema = require('mongoose').Schema

exports.PokemonSchema = new Schema({
    name: String,
    owner: String,
    health: Number
}, {collection: 'pokemon'})



// https://www.amazon.com/gp/css/order-history?ref_=nav_orders_first