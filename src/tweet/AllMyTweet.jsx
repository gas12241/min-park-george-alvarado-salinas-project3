import React from "react";
import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Tweet.css";

export default function AllTweets() {
  const [tweets, setTweets] = useState([]);
  const [tweetInput, setTweetInput] = useState({
    name: "",
  });

  function getAllTweetData() {
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
        });
      });
  }

  const tweet_components = [];
  for (let i = 0; i < tweets.length; i++) {
    const tweet = tweets[i];
    const tweet_component = (
      <div className="tweet-components">
        <NavLink to={"/" + tweet._id}>{tweet.name}</NavLink>
        <date>{tweet.date}</date>
        <br />
        <br />
        <br />
      </div>
    );
    tweet_components.push(tweet_component);
  }

  return (
    <div className="page-body">
      <div>Add new Tweet:</div>
      <div>
        <input value={tweetInput.name} onInput={onTweetInput} />
      </div>
      <div>
        <button onClick={onSubmit}>Submit</button>
      </div>
      <div>
        <div>Here are all my Tweets: </div>
        <ul>{tweet_components}</ul>
      </div>
    </div>
  );
}
