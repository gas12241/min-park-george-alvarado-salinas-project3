import Axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    Axios.get("/api/user/isLoggedIn")
      .then(() => {
        navigate("/myTweet");
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
      navigate("/myTweet");
    });
  }

  return (
    <div>
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

// This is the class code
//
// import Axios from "axios";
// import React, { useEffect } from "react";
// import { useState } from "react";
// import { useNavigate } from "react-router";

// export default function Login() {
//   const navigate = useNavigate();
//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState("");

//   useEffect(() => {
//     Axios.get("/api/user/isLoggedIn")
//       .then(() => {
//         navigate("/myTweet");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   function updatePassword(event) {
//     setPassword(event.target.value);
//   }

//   function updateUserName(event) {
//     setUserName(event.target.value);
//   }

//   function createUser() {
//     Axios.post("/api/user/authenticate", {
//       name: userName,
//       password,
//     }).then(function (response) {
//       navigate("/myTweet");
//     });
//   }

//   return (
//     <div>
//       <p1>Login with Existing User</p1>
//       <div>
//         <label>Username:</label>
//         <input type="text" onInput={updateUserName}></input>
//       </div>
//       <div>
//         <label>Password:</label>
//         <input type="password" onInput={updatePassword}></input>
//       </div>
//       <button onClick={createUser}>Submit</button>
//     </div>
//   );
// }
