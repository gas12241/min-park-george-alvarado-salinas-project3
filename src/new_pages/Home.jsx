import React from "react";
import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Home.css";

export default function Home() {
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
  const [tweets, setTweets] = useState([]);
  const [tweetInput, setTweetInput] = useState({
    name: "",
    // health: 0,
    // user: "",
    // date: Date.now,
  });

  function getAllTweetData() {
    // let getPokemonData = null;
    Axios.get("/api/tweet").then(function (response) {
      setTweets(response.data);
    });
  }

  useEffect(function () {
    getAllTweetData();
  }, []);

  function onTweetInput(e) {
    const name = e.target.value;
    setTweetInput({
      ...tweetInput,
      name,
    });
  }

  function onSubmit() {
    Axios.post("/api/tweet", tweetInput)
      .then(function (response) {
        getAllTweetData();
      })
      .finally(function () {
        setTweetInput({
          name: "",
          // health: 0,
          // user: "",
          // date: Date.now,
        });
        location.reload();
      });
  }

  const tweet_components = [];
  for (let i = 0; i < tweets.length; i++) {
    const tweet = tweets[i];
    const tweet_component = (
      <div>
        <NavLink to={"/" + tweet._id}>{tweet.name}</NavLink>
        <br />
        <date>{tweet.date}</date>
        <br />
        <br />
        <br />
      </div>
    );
    tweet_components.push(tweet_component);
  }
  if (loggedIn) {
    return (
      <div className="page-body">
        <div className="title-tag">Add new Tweet:</div>
        <div className="spacing-style">
          <div className="input-field">
            <input value={tweetInput.name} onInput={onTweetInput} />
          </div>
        </div>
        <div>
          <button onClick={onSubmit}>Submit</button>
        </div>
        <ul>{tweet_components}</ul>
      </div>
    );
  } else {
    return (
      // Different styles for logged in.
      <div className="page-body">
        <div>Home Page</div>
        <ul>{tweet_components}</ul>
      </div>
    );
  }
}
