import React from "react";
import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function AllTweet() {
  const [tweets, setTweets] = useState([]);
  const [tweetInput, setTweetInput] = useState({
    name: "",
    health: 0,
    user: "",
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

  function onNameInput(e) {
    const name = e.target.value;
    setTweetInput({
      ...tweetInput,
      name,
    });
  }

  function onHealthInput(e) {
    const health = e.target.value;
    setTweetInput({
      ...tweetInput,
      health,
    });
  }

  function onUserInput(e) {
    const user = e.target.value;
    setTweetInput({
      ...tweetInput,
      user,
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
          health: 0,
          user: "",
        });
      });
  }

  const tweet_components = [];
  for (let i = 0; i < tweets.length; i++) {
    const tweet = tweets[i];
    const tweet_component = (
      <li>
        <NavLink to={"/" + tweet._id}>{tweet.name}</NavLink>
      </li>
    );
    tweet_components.push(tweet_component);
  }

  return (
    <div>
      <div>Here are all my Tweets: </div>
      <ul>{tweet_components}</ul>
      <div>
        Add new Tweet:
        <div>
          Name: <input value={tweetInput.name} onInput={onNameInput} />
        </div>
        <div>
          Health:{" "}
          <input
            type="number"
            value={tweetInput.health}
            onInput={onHealthInput}
          />
        </div>
        <div>
          User: <input value={tweetInput.user} onInput={onUserInput} />
        </div>
        <div>
          <button onClick={onSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}
