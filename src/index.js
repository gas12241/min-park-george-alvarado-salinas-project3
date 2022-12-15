import React from "react";
import ReactDOM from "react-dom/client";
// import Calculator from './Calculator';
import AllMyTweet from "./tweet/AllMyTweet";
import TweetDetails from "./tweet/TweetDetails";
import Home from "./new_pages/Home";
import CreateTweet from "./new_pages/CreateTweet";
import "./index.css";
import { useState } from "react";
import { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Axios from "axios";

const root = ReactDOM.createRoot(document.getElementById("root"));
// <img src="" />

const reactRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/myTweet",
    element: <AllMyTweet />,
  },
  // 'localhost:3000' + /123213
  // 'localhost:3000' + /1
  // 'localhost:3000' + /charizard
  {
    path: "/:tweetId",
    element: <TweetDetails />,
  },
  {
    path: "/user/:user",
    element: <TweetDetails />,
  },
  {
    path: "/create-tweet",
    element: <CreateTweet />,
  },

  // {
  //   path: "/",
  //   element: <Calculator />
  // },
  // {
  //   path: "/result5",
  //   element: <Result totalSum={15} />
  // }
]);

function Header() {
  // Code I added, itk's supposed to say, normally you are set to
  // not logged in, but if you are, set loggedInClass to loggedInClass
  // and then that will be used below to check what should pop up
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    Axios.get("/api/user/isLoggedIn")
      .then(() => {
        setLoggedIn(true);
      })
      .catch((err) => {
        setLoggedIn(false);
        console.log(err);
      });
  }, []);

  function logout() {
    Axios.post("/api/user/logOut").then(() => {
      location.reload();
    });
  }
  if (loggedIn) {
    return (
      <nav className="nav">
        <div>
          <a href="/" className="website-title">
            Witter
          </a>
        </div>
        <div className="nav-sideways">
          <a href="/create-tweet">Create Tweet</a>
          <button onClick={logout}>Logout</button>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="nav">
        <div>
          <a href="/" className="website-title">
            Witter
          </a>
        </div>
        <div className="nav-sideways">
          <a href="/register">Register</a>
          <a href="/login">Login</a>
        </div>
      </nav>
    );
  }
}

root.render(
  <React.StrictMode>
    <Header />
    <RouterProvider router={reactRouter} /> {/* <Calculator/>, <Result /> */}
  </React.StrictMode>
);
