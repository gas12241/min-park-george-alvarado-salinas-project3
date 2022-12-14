import React from "react";
import ReactDOM from "react-dom/client";
// import Calculator from './Calculator';
import AllTweet from "./tweet/AllTweet";
import AllMyTweet from "./tweet/AllMyTweet";
import TweetDetails from "./tweet/TweetDetails";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import axios from "axios";

const root = ReactDOM.createRoot(document.getElementById("root"));
// <img src="" />

const reactRouter = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/all",
    element: <AllTweet />,
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
  function logout() {
    axios.post("/api/user/logOut").then(() => {
      location.reload();
    });
  }

  return (
    <div>
      <a href="/">Register</a>&nbsp;&nbsp;
      <a href="/all">All Tweets</a> &nbsp;&nbsp;
      <a href="/login">Login</a>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

root.render(
  <React.StrictMode>
    <Header />
    <RouterProvider router={reactRouter} /> {/* <Calculator/>, <Result /> */}
  </React.StrictMode>
);
