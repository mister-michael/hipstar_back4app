import React, { useState, useEffect } from "react"
import AppViews from "./AppViews"
import NavBar from "./nav/NavBar"

const HipStar = (props) => {

  const isAuthenticated = () => sessionStorage.getItem("userId") !== null ? true : false
  const [hasUser, setHasUser] = useState(isAuthenticated()); 

  const setUser = (userId) => {
    sessionStorage.setItem("userId", userId);
    setHasUser(isAuthenticated()); 
  }

  const clearUser = () => {
    sessionStorage.clear();
    setHasUser(isAuthenticated()); 
  }

  useEffect(()=>{

  },[hasUser])

  return (
    <>
      <NavBar setUser={setUser} hasUser={hasUser} clearUser={clearUser} {...props}/>
      <AppViews setUser={setUser} hasUser={hasUser} {...props} />
    </>
  )
};

export default HipStar;