import React, { useState } from "react"
import AppViews from "./AppViews"
import NavBar from "./nav/NavBar"

const HipStar = (props) => {

  const isAuthenticated = () => sessionStorage.getItem("userId") !== null;
  const [hasUser, setHasUser] = useState(isAuthenticated()); 

  const setUser = (user) => {
    sessionStorage.setItem("credentials", JSON.stringify(user));
    setHasUser(isAuthenticated()); 
  }

  const clearUser = () => {
    sessionStorage.clear();
    setHasUser(isAuthenticated()); 
  }

  return (
    <>
      <NavBar setUser={setUser} hasUser={hasUser} clearUser={clearUser} {...props}/>
      <AppViews setUser={setUser} hasUser={hasUser} {...props} />
    </>
  )
};

export default HipStar;