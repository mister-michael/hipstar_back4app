import React from "react";
import { Route, Redirect } from "react-router-dom";
import Login from "./auth/Login"
import Register from "./auth/Register"
import Home from "./home/Home"
import Profile from "./profile/Profile"
import Search from "./search/Search"
import RecList from "./rec/RecList"
import Hpstr from "./hpstr/Hpstr"
import UserProfile from "./UserProfile/UserProfile"

const AppViews = (props) => {
  const activeUserId = parseInt(sessionStorage.getItem("userId"));
  const setUser = props.setUser;
  const hasUser = props.hasUser;

  return (
    <React.Fragment>
      <Route
        exact
        path="/login"
        render={props => {
          if (hasUser) { return <Redirect to="/home" /> } else { return <Login setUser={setUser} hasUser={hasUser} {...props} /> };
        }}
      />
      <Route
        exact
        path="/register"
        render={props => {
          if (hasUser) { return <Redirect to="/home" /> } else { return <Register setUser={setUser} hasUser={hasUser} {...props} /> }
        }}
      />
      <Route
        exact
        path="/home"
        render={props => {
          if (hasUser) { return <Home setUser={setUser} hasUser={hasUser} {...props} /> } else { return <Redirect to="/login" /> }
        }}
      />
      <Route
        exact
        path="/HPSTR"
        render={props => {
          if (hasUser) { return <Hpstr setUser={setUser} hasUser={hasUser} {...props} /> } else { return <Redirect to="/login" /> }
        }}
      />
      <Route
        exact
        path="/profile"
        render={props => {
          if (hasUser) { return <Profile userId={activeUserId} /> } else { return <Redirect to="/login" /> }
        }}
      />
      <Route
        exact
        path="/recommendations"
        render={props => {
          if (hasUser) { return <RecList activeUserId={activeUserId} /> } else { return <Redirect to="/login" /> }
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
        path="/"
        render={props => {
          if (hasUser) {
            return (
              <UserProfile
                userId={parseInt(props.match.params.userId)}
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