import Axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Register() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function updatePassword(event) {
    setPassword(event.target.value);
  }

  function updateUserName(event) {
    setUserName(event.target.value);
  }

  function createUser() {
    Axios.post("/api/user/register", {
      name: userName,
      password,
    }).then(function (response) {
      navigate("/all");
      location.reload();
    });
  }

  return (
    <div>
      <p1>Create New User</p1>
      <div>
        <label>Username:</label>
        <input type="text" onInput={updateUserName}></input>
      </div>
      <div>
        <label>Password:</label>
        <input type="password" onInput={updatePassword}></input>
      </div>
      <button onClick={createUser}>Submit</button>
    </div>
  );
}

// This is the class code
//
// import Axios from "axios";
// import React from "react";
// import { useState } from "react";
// import { useNavigate } from "react-router";

// export default function Register() {
//   const navigate = useNavigate();
//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState("");

//   function updatePassword(event) {
//     setPassword(event.target.value);
//   }

//   function updateUserName(event) {
//     setUserName(event.target.value);
//   }

//   function createUser() {
//     Axios.post("/api/user/register", {
//       name: userName,
//       password,
//     }).then(function (response) {
//       navigate("/myTweet");
//     });
//   }

//   return (
//     <div>
//       <p1>Create New User</p1>
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
