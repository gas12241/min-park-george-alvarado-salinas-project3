import Axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';


export default function Register() {

    const navigate = useNavigate()
    const [ownerName, setOwnerName] = useState('');
    const [password, setPassword] = useState('');

    function updatePassword(event) {
        setPassword(event.target.value);
    }

    function updateOwnerName(event) {
        setOwnerName(event.target.value);
    }

    function createOwner() {
        Axios.post('/api/owner/register', {
            name: ownerName,
            password,
        })
        .then(function(response) {
            navigate('/myPokemon')
        })

    }

    return (
        <div>
            <p1>Create New User</p1>
            <div>
                <label>Name:</label>
                <input type="text" onInput={updateOwnerName} ></input>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" onInput={updatePassword} ></input>
            </div>
            <button onClick={createOwner}>Submit</button>

        </div>
    )


} 