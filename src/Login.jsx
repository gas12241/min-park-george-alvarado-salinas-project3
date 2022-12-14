import Axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();
  const [ownerName, setOwnerName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    Axios.get("/api/owner/isLoggedIn")
      .then(() => {
        navigate("/myPokemon");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function updatePassword(event) {
    setPassword(event.target.value);
  }

  function updateOwnerName(event) {
    setOwnerName(event.target.value);
  }

  function createOwner() {
    Axios.post("/api/owner/authenticate", {
      name: ownerName,
      password,
    }).then(function (response) {
      navigate("/myPokemon");
    });
  }

  return (
    <div>
      <p1>Login with Existing User</p1>
      <div>
        <label>Name:</label>
        <input type="text" onInput={updateOwnerName}></input>
      </div>
      <div>
        <label>Password:</label>
        <input type="password" onInput={updatePassword}></input>
      </div>
      <button onClick={createOwner}>Submit</button>
    </div>
  );
}
