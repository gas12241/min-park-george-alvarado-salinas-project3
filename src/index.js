import React from 'react';
import ReactDOM from 'react-dom/client';
// import Calculator from './Calculator';
import AllPokemon from './pokemon/AllPokemon';
import AllMyPokemon from './pokemon/AllMyPokemon';
import PokemonDetails from './pokemon/PokemonDetails';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider, 
  Route,
  Link,
} from "react-router-dom";
import Register from './Register';
import Login from './Login';
import axios from 'axios';


const root = ReactDOM.createRoot(document.getElementById('root'));
// <img src="" />

const reactRouter = createBrowserRouter([
  {
    path: "/",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  }, 
  {
    path: "/all",
    element: <AllPokemon />
  },
  {
    path: '/myPokemon',
    element: <AllMyPokemon />
  },
  // 'localhost:3000' + /123213
  // 'localhost:3000' + /1
  // 'localhost:3000' + /charizard
  {
    path: '/:pokemonId',
    element: <PokemonDetails />
  },


  // {
  //   path: "/",
  //   element: <Calculator />
  // },
  // {
  //   path: "/result5",
  //   element: <Result totalSum={15} />
  // }


])

function Header() {

  function logout() {
    axios.post('/api/owner/logOut')
      .then(() => {
        location.reload();
      })
  }

  return (
    <div>
      <a href="/">Register</a>&nbsp;&nbsp;
      <a href="/all">All Pokemon</a> &nbsp;&nbsp;
      <a href="/login">login</a>
      <button onClick={logout}>Logout</button>
    </div>
  )


}

root.render(
  <React.StrictMode>
      <Header />
      <RouterProvider router={reactRouter} />    {/* <Calculator/>, <Result /> */}
  </React.StrictMode>
);

