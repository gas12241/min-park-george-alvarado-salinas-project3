import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';

// 'localhost:3000/:pokemonId'
// 'localhost:3000/123
export default function PokemonDetails() {
    const params = useParams();
    const [pokemon, setPokemon] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(function() {
        const pokemonId = params.pokemonId;
        axios.get('/api/pokemon/' + pokemonId)
            .then(function(response) {
                const pokemon = response.data;
                setPokemon(pokemon)
            })
            .catch(function(error){ 
                setIsError(true);
            })
            .finally(function() {
                setIsLoading(false);
            })

    }, []);

    if (isLoading) {
        return (<div>Loading....</div>)
    }

    if(isError) {

        return (<div>Could not find pokemon with ID {params.pokemonId}</div>)

    }

    return (<div>
        <div>Details for Pokemon:</div>
        <div>Name: {pokemon.name}</div>
        <div>Health: {pokemon.health}</div>
        <div>Owner: {pokemon.owner}</div>
    </div>)

}