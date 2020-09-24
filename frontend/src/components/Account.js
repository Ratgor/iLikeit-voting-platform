import React, { Component } from "react";

import { Button } from "react-bootstrap";
import  CheckAuth, {Greeting } from "./CheckAuth";
import { Redirect } from "react-router-dom";

class Account extends Component {
  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout() {
    localStorage.setItem('isLoggedIn', false)
    //this.props.setAuth(!(this.props.isLoggedIn))
    this.props.history.push("/")
  }


  render() {
    return (
      <div>
        {!(CheckAuth()) ? <Redirect to="/"/> : null }
        <h2>ACCOUNT</h2>
        <p>Here the current account info should be</p>
        <Button variant ="primary"
                value="LogOut"
                onClick={this.handleLogout}>Logout
        </Button>
        <Greeting isLoggedIn={CheckAuth()} />
      </div>
    );
  }
}

export default Account;
