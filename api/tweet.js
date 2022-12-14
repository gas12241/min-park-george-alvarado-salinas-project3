const express = require("express");

const TweetModel = require("../db/tweet.model");

const router = express.Router();

const tweets = [
  {
    username: "GAS",
    timestamp: "12/14/22",
    text: "Hello, this is GAS, A.K.A. George",
  },
];

// server.js
// "/api/pokemon" + "/"

// () => {
//     NavigationPreloadManager()
// }

// function() {

// }

router.get("/", function (request, response) {
  return TweetModel.getAllTweets()
    .then(function (data) {
      response.send(data);
    })
    .catch(function (err) {
      response.status(400);
      response.send(err);
    });
});

router.get("/tweetsByUser", function (request, response) {
  const userName = request.cookies.user;

  if (userName) {
    return TweetModel.getTweetsByUser(userName)
      .then(function (data) {
        response.send(data);
      })
      .catch(function (err) {
        response.status(400);
        response.send(err);
      });
  } else {
    return response.status(400).send("No token available");
  }
});

/*
router.get("/pokemonGreaterThan10", function (request, response) {
  return PokemonModel.getAllPokemonHealthAbove10().then(function (
    pokemonResult
  ) {
    return response.send(pokemonResult);
  });
});
*/

router.get("/user", function (request, response) {
  const user = request.cookies.userName;

  return TweetModel.getTweetByUser(user).then(function (tweetResult) {
    return response.send(tweetResult);
  });
});

// localhost:8000/api/owner/owner/hunter
// req.params.owner === 'hunter
router.get("/user/:user", function (request, response) {
  const user = request.params.user;

  return TweetModel.getTweetsByUser(user).then(function (tweetResult) {
    return response.send(tweetResult);
  });
});

// '/api/pokemon' + '/1'
// '/api/pokemon' + '/12'
// '/api/pokemon' + '/1231231'
router.get("/:tweetId/", function (req, res) {
  const tweetId = req.params.tweetId;

  return TweetModel.getTweetById(tweetId).then(function (tweetResult) {
    return res.send(tweetResult);
  });
  // for(let i = 0; i < pokemons.length; i++) {
  //     const pokemon = pokemons[i];
  //     if (pokemon.id === pokemonId) {
  //         return res.send(pokemon);
  //     }
  // }

  // res.status(404)
  // res.send("Could not find pokemond with id " + pokemonId)
});

// 'http://localhost:8000/api/pokemon'
router.post("/", function (request, response) {
  const body = request.body;

  return TweetModel.insertTweet(body)
    .then(function (data) {
      response.send(data);
    })
    .catch(function (err) {
      response.status(400);
      response.send(err);
    });

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
});

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
