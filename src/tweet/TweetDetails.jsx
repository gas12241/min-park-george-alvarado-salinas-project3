import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";

// 'localhost:3000/:pokemonId'
// 'localhost:3000/123
export default function TweetDetails() {
  const params = useParams();
  const [tweet, setTweet] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(function () {
    const tweetId = params.tweetId;
    axios
      .get("/api/tweet/" + tweetId)
      .then(function (response) {
        const tweet = response.data;
        setTweet(tweet);
      })
      .catch(function (error) {
        setIsError(true);
      })
      .finally(function () {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (isError) {
    return <div>Could not find tweet with ID {params.tweetId}</div>;
  }

  return (
    <div>
      <div>Details for Tweet:</div>
      <div>Tweet: {tweet.name}</div>
      {/* <div>Health: {tweet.health}</div> */}
      <div>User: {tweet.user}</div>
    </div>
  );
}
