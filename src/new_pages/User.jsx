import React from "react";
import "./User.css";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const userprofile = {
  name: "George Alvardo-Salinas",
  username: "@geemongee",
  date: "12/24",
  description:
    "This is the optional description, I am going to type nonsense to see if this all gets centered the way it should.  this should be long enough, what do you think?",
};

export default function User() {
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

  return (
    <div className="page-styling">
      <div className="box-styling">
        <div className="name-styling">{userprofile.name}</div>
      </div>
      <div className="box-styling">
        <div className="username-styling">{userprofile.username}</div>
      </div>
      <div className="box-styling">
        <div className="description-styling">{userprofile.description}</div>
      </div>
      <div>{tweet_components}</div>
    </div>
  );
}
