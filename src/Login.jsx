import Axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    Axios.get("/api/user/isLoggedIn")
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function updatePassword(event) {
    setPassword(event.target.value);
  }

  function updateUserName(event) {
    setUserName(event.target.value);
  }

  function createUser() {
    Axios.post("/api/user/authenticate", {
      name: userName,
      password,
    }).then(function (response) {
      location.reload();
      navigate("/");
    });
  }

  return (
    <div className="page-body">
      <p1>Login with Existing User</p1>
      <div>
        <label>Username:</label>
        <input type="text" onInput={updateUserName}></input>
      </div>
      <div>
        <label>Password:</label>
        <input type="password" onInput={updatePassword}></input>
      </div>
      <button onClick={createUser}>Log In</button>
    </div>
  );
}
