const mongoose = require('mongoose');

const PokemonSchema = require('./pokemon.schema').PokemonSchema

const PokemonModel = mongoose.model("Pokemon", PokemonSchema);

function insertPokemon(pokemon) {
    return PokemonModel.create(pokemon);
}

function getAllPokemon() {
    return PokemonModel.find().exec();
}

function getAllPokemonHealthAbove10() {
    return PokemonModel.find({
        health: {
            $gte: 10,
        }
    }).exec();
}

function getPokemonById(id) {
    return PokemonModel.findById(id).exec();
}

function getPokemonByOwner(owner) {
    return PokemonModel.find({
        owner: owner
    }).exec();
}


module.exports = {
    insertPokemon: insertPokemon,
    getAllPokemon,
    getPokemonById,
    getAllPokemonHealthAbove10,
    getPokemonByOwner,
}