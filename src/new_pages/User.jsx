import React from "react";
import "./User.css";

const userprofile = {
  name: "George Alvardo-Salinas",
  username: "@geemongee",
  date: "12/24",
  description:
    "This is the optional description, I am going to type nonsense to see if this all gets centered the way it should.  this should be long enough, what do you think?",
};

export default function User() {
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
    </div>
  );
}
