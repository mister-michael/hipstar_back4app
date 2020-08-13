import React from "react";
import { Route, Redirect } from "react-router-dom";
import Login from "./auth/Login"
import Register from "./auth/Register"
import HomePage from "./home/HomePage"
import Profile from "./profile/Profile"
import Search from "./search/Search"
import RecList from "./rec/RecList"
import RecListUpdated from './rec/RecListUpdated';
import Hpstr from "./hpstr/Hpstr"
import UserProfile from "./UserProfile/UserProfile"

const AppViews = (props) => {
  
  const activeUserId = sessionStorage.getItem("userId");
  const setUser = props.setUser;
  let hasUser = props.hasUser;

  return (
    <React.Fragment>
      <Route
        exact
        path="/login"
        render={props => {
          if (hasUser) { return <Redirect to="/home" /> } else { return <Login setUser={setUser} {...props} /> };
        }}
      />
      <Route
        exact
        path="/register"
        render={props => {
          if (hasUser) { return <Redirect to="/home" /> } else { return <Register setUser={setUser} {...props} /> }
        }}
      />
      <Route
        exact
        path="/home"
        render={props => {
          if (hasUser) { return <HomePage {...props} /> } else { return <Redirect to="/login" /> }
        }}
      />
      <Route
        exact
        path="/HPSTR"
        render={props => {
          if (hasUser) { return <Hpstr {...props} /> } else { return <Redirect to="/login" /> }
        }}
      />
      <Route
        exact
        path="/profile"
        render={props => {
          if (hasUser) { return <Profile userId={activeUserId} {...props}/> } else { return <Redirect to="/login" /> }
        }}
      />
      <Route
        exact
        path="/recommendations"
        render={props => {
          if (hasUser) { return <RecListUpdated activeUserId={activeUserId} {...props}/> } else { return <Redirect to="/login" /> }
        }}
      />
      <Route
        exact
        path="/search"
        render={props => {
          if (hasUser) { return <Search activeUserId={activeUserId} {...props} /> } else { return <Redirect to="/login" /> }
        }}
      />
      <Route
        exact
        path="/user/:userId(\w+)"
        render={props => {
          if (hasUser) {
            return (
              <UserProfile
                userId={props.match.params.userId}
                activeUserid={activeUserId}
                {...props}
              />
            );
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
    </React.Fragment>
  )
};

export default AppViews;