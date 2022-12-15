import React from "react";
import ReactDOM from "react-dom/client";
// import Calculator from './Calculator';
import AllTweet from "./tweet/AllTweet";
import AllMyTweet from "./tweet/AllMyTweet";
import TweetDetails from "./tweet/TweetDetails";
import "./index.css";
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
  // Code I added, itk's supposed to say, normally you are set to
  // not logged in, but if you are, set loggedInClass to loggedInClass
  // and then that will be used below to check what should pop up.
  let loggedInClass = "notLoggedInClass";
  useEffect(() => {
    Axios.get("/api/user/isLoggedIn")
      .then(() => {
        loggedInClass = "loggedInClass";
      })
      .catch((err) => {
        loggedInClass = "notLoggedInClass";
        console.log(err);
      });
  }, []);

  function logout() {
    Axios.post("/api/user/logOut").then(() => {
      location.reload();
    });
  }

  // I also added this conditional, should work as follows
  // if not logged in, return code to get to register, all tweets
  // and login.  If you are logged in, only things that should pop
  // up are the tweets and logout.
  if (loggedInClass === "notLoggedInClass") {
    return (
      <div>
        <a href="/">Register</a>&nbsp;&nbsp;
        <a href="/all">All Tweets</a> &nbsp;&nbsp;
        <a href="/login">Login</a>
        <button onClick={logout}>Logout</button>
      </div>
    );
  } else {
    return (
      <div>
        <div>You are logged in!</div>
        <a href="/all">All Tweets</a> &nbsp;&nbsp;
        <button onClick={logout}>Logout</button>
      </div>
    );
  }
  // return (
  //   <div>
  //     <a href="/">Register</a>&nbsp;&nbsp;
  //     <a href="/all">All Tweets</a> &nbsp;&nbsp;
  //     <a href="/login">Login</a>
  //     <button onClick={logout}>Logout</button>
  //   </div>
  // );
  // if (loggedInClass) {
  //   return (
  //     <div>
  //       <a href="/all">All Tweets</a> &nbsp;&nbsp;
  //       <button onClick={logout}>Logout</button>
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div>
  //       <a href="/">Register</a>&nbsp;&nbsp;
  //       <a href="/all">All Tweets</a> &nbsp;&nbsp;
  //       <a href="/login">Login</a>
  //       <button onClick={logout}>Logout</button>
  //     </div>
  //   );
  // }
}

root.render(
  <React.StrictMode>
    <Header />
    <RouterProvider router={reactRouter} /> {/* <Calculator/>, <Result /> */}
  </React.StrictMode>
);
