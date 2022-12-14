const express = require('express');

const PokemonModel = require('../db/pokemon.model');

const router = express.Router();

const pokemons = [
    {
        name: 'charizard',
        health: 100,
        id: 1,
        owner: 'hunter',
    }
];

// server.js
// "/api/pokemon" + "/"


// () => {
//     NavigationPreloadManager()    
// }

// function() {
    
// }

router.get('/', function(request, response) {

        return PokemonModel.getAllPokemon()
        .then(function(data) {
            response.send(data);
        })
        .catch(function(err) {
            response.status(400);
            response.send(err);
        })

})

router.get('/pokemonByOwner', function(request, response) {
    const ownerName = request.cookies.owner;

    if(ownerName) {
        return PokemonModel.getPokemonByOwner(ownerName)
        .then(function(data) {
            response.send(data);
        })
        .catch(function(err) {
            response.status(400);
            response.send(err);
        })
    } else {
        return response.status(400).send('No token available')

    }

})

router.get('/pokemonGreaterThan10', function(request, response) {
    return PokemonModel.getAllPokemonHealthAbove10()
        .then(function(pokemonResult) {
            return response.send(pokemonResult)
        })

})

router.get('/owner', function(request, response) {

    const owner = request.cookies.ownerName;

    return PokemonModel.getPokemonByOwner(owner)
    .then(function(pokemonResult) {
        return response.send(pokemonResult)
    })
})

// localhost:8000/api/owner/owner/hunter
// req.params.owner === 'hunter
router.get('/owner/:owner', function(request, response) {

    const owner = request.params.owner;

    return PokemonModel.getPokemonByOwner(owner)
        .then(function(pokemonResult) {
            return response.send(pokemonResult)
        })
})

// '/api/pokemon' + '/1'
// '/api/pokemon' + '/12'
// '/api/pokemon' + '/1231231'
router.get('/:pokemonId/', function(req, res) {
    const pokemonId = req.params.pokemonId;

    return PokemonModel.getPokemonById(pokemonId)
        .then(function(pokemonResult) {
            return res.send(pokemonResult);
        })
    // for(let i = 0; i < pokemons.length; i++) {
    //     const pokemon = pokemons[i];
    //     if (pokemon.id === pokemonId) {
    //         return res.send(pokemon);
    //     }
    // }

    // res.status(404)
    // res.send("Could not find pokemond with id " + pokemonId)
})

// 'http://localhost:8000/api/pokemon'
router.post('/', function(request, response) {
    const body = request.body;

    return PokemonModel.insertPokemon(body)
        .then(function(data) {
            response.send(data);
        })
        .catch(function(err){
            response.status(400)
            response.send(err);
        })

    // const newId = pokemons[pokemons.length - 1].id + 1;

    // const newPokemon = {
    //     name: name,
    //     health: health,
    //     owner: owner,
    //     id: newId,
    // }

    // pokemons.push(newPokemon);

    // response.status(200);

    // response.send(newPokemon);

})

// router.get('/', function(request, response) {
//     const initialLetters = request.query.initialLetters;

//     if (initialLetters) {
//         const filteredPokemon = [];
//         for(let i = 0; i < pokemons.length; i++) {
//             let pokemon = pokemons[i];
//             if (pokemon.startsWith(initialLetters)) {
//                 filteredPokemon.push(pokemon);
//             }
//         }
//         response.send(filteredPokemon);
//     } else {
//         response.send(pokemons);
//     }

// });

// router.get('/:pokemonId', function(request, response) {
//     const pokemonIdStr = request.params.pokemonId;

//     const translatePokemonId = new Number(pokemonIdStr);

//     const pokemon = pokemons[translatePokemonId];

//     response.send(pokemon);

// });

// router.post('/', function(request, response) {
//     const newPokemon = request.body.pokemonName;

//     pokemons.push(newPokemon);

//     response.status(200);
//     response.send("Success");
// });

// router.put('/:pokemonId', function(request, response) {
//     const pokemonIdStr = request.params.pokemonId;
//     const translatePokemonId = new Number(pokemonIdStr);

//     const updatedPokemonName = request.body.pokemonName;

//     pokemons[translatePokemonId] = updatedPokemonName;

//     response.status(200);
//     response.send("Success");
// })

// router.delete('/:pokemonId', function(request, response) {
//     const pokemonIdStr = request.params.pokemonId;
//     const translatePokemonId = new Number(pokemonIdStr);

//     pokemons.splice(translatePokemonId, 1);

//     response.send("Success");
// })

// router.get('/randomPokemon', function(request, response) {

//     const randomPokemonIndex = Math.floor(Math.random() * pokemons.length);
//     response.send(pokemons[randomPokemonIndex]);

// });

module.exports = router;