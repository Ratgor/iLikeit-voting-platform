import React, { Component } from "react";

import { Button, ButtonToolbar } from "react-bootstrap";
import  CheckAuth, {Greeting } from "./CheckAuth";
import { Redirect } from "react-router-dom";

import { userHash } from "./userHash";

class User extends Component {
  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
    this.requestLogout = this.requestLogout.bind(this)
    this.requestTokenVerify = this.requestTokenVerify.bind(this)
  }

  handleLogout(event) {
    event.preventDefault(); // not required? prevents a browser reload/refresh on event

    const authTokenHeader = localStorage.getItem('authTokenHeader');
    console.log("DEBUG auth token logout: ", authTokenHeader)

    if (authTokenHeader.startsWith('JWT')){
      const userAuthResp = JSON.parse(localStorage.getItem('userAuthResp'));
      const userAuthToken = userAuthResp.access_token;
      this.requestTokenVerify(userAuthToken)
    };

    this.requestLogout(authTokenHeader);

    localStorage.setItem('isLoggedIn', false)
    localStorage.setItem('userAuthResp', null)
    localStorage.setItem('authTokenHeader', null)
    userHash(null)

    this.props.history.push("/")
  }


  requestTokenVerify(userAuthToken) {
    // verify token only when using JWT
    fetch('/dj-rest-auth/token/verify/', {
      method: 'POST',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body:  JSON.stringify({'token': userAuthToken,})
    }).then(resp => resp.json()
     ).then(data => {
      if (Object.entries(data).length===0 && data.constructor === Object){
        console.log("Token ok, json response: ", data)
      }else{
        console.log("Token fail, json response: ", data)
      }
    }).catch(error => console.log('ERROR ->', error))
  }

  requestLogout(authTokenHeader) {
    return fetch('/dj-rest-auth/logout/', {
      method: 'POST',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': authTokenHeader,
      },
      body:  JSON.stringify({})
    }).then(resp => resp.json()).then(data => {
      console.log(data)
    }).catch(error => console.log('error ->', error))

    /* be aware!
    resp.json for both token-with and token-less logout:
    {detail: "Invalid token."}
    {detail: "Successfully logged out."}
    */
  }


  render() {
    const userAuthResp = JSON.parse(localStorage.getItem('userAuthResp'));
    return (
      <div>
        {!(CheckAuth()) ? <Redirect to="/"/> : null}
        <p><Greeting isLoggedIn={CheckAuth()} /></p>
        <p>User name: {(userAuthResp && userAuthResp.user) ?
          userAuthResp.user.username : "N/D"}</p>
        <p>First name: {(userAuthResp && userAuthResp.user) ?
          userAuthResp.user.first_name : "N/D"}</p>
        <p>Last name: {(userAuthResp && userAuthResp.user) ?
          userAuthResp.user.last_name : "N/D"}</p>
        <p>User id: {(userAuthResp && userAuthResp.user) ?
          userAuthResp.user.id : "N/D"}</p>
        <p>User pk: {(userAuthResp && userAuthResp.user) ?
          userAuthResp.user.pk : "N/D"}</p>
        <p style={{"whiteSpace": "nowrap", "overflow": "auto", "overflowY": "hidden"}}>
            Access token: {(userAuthResp && userAuthResp.user) ?
              userAuthResp.access_token : "N/D"}</p>
        <p style={{"whiteSpace": "nowrap", "overflow": "auto", "overflowY": "hidden"}}>
            Refresh token: {(userAuthResp && userAuthResp.user) ?
              userAuthResp.refresh_token : "N/D"}</p>
        <ButtonToolbar className="justify-content-left">
        <Button variant ="outline-primary" size="sm"
                value="Logout"
                onClick={this.handleLogout}>Logout
        </Button>
        {/*four spaces before delete button*/}
        {'\u00A0\u00A0\u00A0\u00A0'}
        <Button variant ="outline-danger" size="sm"
                value="Delete the account"
                onClick={() => window.confirm(
                  "Do you really want to remove the account?\n\n"
                  +"(the method is not implemented yet, \n"
                  +"any answer means \"no\")") ?
                  console.log("yes for deleting the account") :
                  console.log("no for deleting the account")
                }>Delete the account
        </Button>
        </ButtonToolbar>
      </div>
    );
  }
}

export default User;
