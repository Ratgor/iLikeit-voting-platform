// from https://ru.reactjs.org/docs/conditional-rendering.html#element-variables

//import React, { Component }  from 'react';
import React from 'react';

function UserGreeting(props) {
  return <h3>You are logged in</h3>;
}

function GuestGreeting(props) {
  return <h3>You are not logged in</h3>;
}

function greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

function CheckAuth() {
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  return isLoggedIn === "true"
}

export default CheckAuth
export const Greeting = greeting
