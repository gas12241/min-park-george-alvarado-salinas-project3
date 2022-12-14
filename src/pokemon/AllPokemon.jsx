import React from 'react';
import Axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export default function AllPokemon() {

    const [pokemons, setPokemons] = useState([]);
    const [pokemonInput, setPokemonInput] = useState({
        name: '',
        health: 0,
        owner: '',
    });

    function getAllPokemonData() {
        // let getPokemonData = null;
        Axios.get('/api/pokemon')
        .then(function(response) {
            setPokemons(response.data);
        })
    }

    useEffect(function() {
        getAllPokemonData();
    }, []);

    function onNameInput(e) {
        const name = e.target.value;
        setPokemonInput({
            ...pokemonInput,
            name
        })
    }

    function onHealthInput(e) {
        const health = e.target.value;
        setPokemonInput({
            ...pokemonInput,
            health
        })
    }

    function onOwnerInput(e) {
        const owner = e.target.value;
        setPokemonInput({
            ...pokemonInput,
            owner
        })
    }

    function onSubmit() {
        Axios.post('/api/pokemon', pokemonInput)
            .then(function(response) {
                getAllPokemonData();
            })
            .finally(function() {
                setPokemonInput({
                    name: '',
                    health: 0,
                    owner: '',
                })

            });
    }

    const pokemon_components = [];
    for(let i = 0; i < pokemons.length; i++){
        const pokemon = pokemons[i];
        const pokemon_component = (<li>
            <NavLink to={'/' + pokemon._id} >{pokemon.name}</NavLink>
            </li>)
        pokemon_components.push(pokemon_component);
    }

    return (<div>
        <div>Here are all my Pokemon: </div>
        <ul>
            {pokemon_components}
        </ul>
        <div>
            Add new Pokemon:
            <div>
                Name: <input value={pokemonInput.name} onInput={onNameInput}/>
            </div>
            <div>
                Health: <input type='number' value={pokemonInput.health} onInput={onHealthInput}/>
            </div>
            <div>
                Owner: <input value={pokemonInput.owner} onInput={onOwnerInput}/>
            </div>
            <div>
                <button onClick={onSubmit}>Submit</button>
            </div>

        </div>
    </div>)
}