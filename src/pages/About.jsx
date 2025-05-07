import React from "react";
import { useContext } from "react";
import UserContext from "../utils/UserContext";

const About = () => {
  const userName = useContext(UserContext);
  return (
    <div>
      About
      <h1>{userName.loggedInUser}</h1>
    </div>
  );
};

export default About;
