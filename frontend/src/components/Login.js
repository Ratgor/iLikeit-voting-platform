import React, { Component, useState } from "react";
import { Button, ButtonGroup, ButtonToolbar, Form, Card, FormGroup, FormControl, FormLabel, Col , FormCheck, InputGroup} from "react-bootstrap";
// tune bottstrap without css https://www.pluralsight.com/guides/how-to-create-smaller-input-in-react-bootstrap
import { Redirect } from "react-router-dom";

import "./Login.css";
import CheckAuth, { Greeting } from "./CheckAuth";

import { isCompactView } from "./isCompactView"

import { userHash } from "./userHash";



class Login extends Component {
   constructor(props) {
       super(props)

       this.state = {
           authResp: null,
           username: "",
           password: "",
           showPass: false,
       }
       this.handleTextChange = this.handleTextChange.bind(this)
       this.handleShowPass = this.handleShowPass.bind(this)
       this.requestAnonimous = this.requestAnonimous.bind(this)
       this.requestLogin = this.requestLogin.bind(this)
       this.requestRegister = this.requestRegister.bind(this)
       this.handleAuthResponse = this.handleAuthResponse.bind(this)
   }

   handleTextChange(event) {
       //console.log(event.target.name)
       this.setState({[event.target.name]: event.target.value})
   }

   handleShowPass(event) {
       //console.log(event.target.name)
       //event.preventDefault();
       //event.stopPropagation();
       //console.log("DEBUG checkbox!!!")
       this.setState({showPass: event.target.checked});
       //this.input.focus();
   }


   handleAuthResponse(data) {
       //console.log(event.target.name)
       //this.setState({[event.target.name]: event.target.value})
       this.setState({authResp: data})

       // JSON.parse works the same locally and fails on remote
       // after localStorage.setItem without JSON.stringify
       localStorage.setItem('userAuthResp', JSON.stringify(this.state.authResp))

       if (this.state.authResp.key){
         localStorage.setItem('authTokenHeader', "Token "+this.state.authResp.key)
       } else if (this.state.authResp.access_token){
         localStorage.setItem('authTokenHeader', "JWT "+this.state.authResp.access_token)
       } else {
         localStorage.setItem('authTokenHeader', null)
       }

       const authTokenHeader = localStorage.getItem('authTokenHeader');

       if (authTokenHeader !== "null"){
         localStorage.setItem('isLoggedIn', true)

         //https://cryptojs.gitbook.io/docs/#documentation
         //const userHashKey = CryptoJS.SHA3(this.state.password, { outputLength: 512 })
         //localStorage.setItem('userHashKey', userHashKey.toString(CryptoJS.enc.Base64))

         userHash(this.state.password)

         this.props.history.push("/")
       }
   }


   requestAnonimous() {
     const user = {
       username: this.state.username,
       password: this.state.password
     } // RTG: not used

     localStorage.setItem('isLoggedIn', true)
     this.props.history.push("/")
   }

   requestLogin(event) {
      event.preventDefault(); // prevents a browser reload/refresh on event
      var username = this.state.username
      var password = this.state.password
      //RTG: how about hashing password on user side?
      //var password_hash = CryptoJS.SHA3(password, { outputLength: 224 })
      //var password_hash_str = password_hash.toString(CryptoJS.enc.Base64);
      console.log("DEBUG: fetching /dj-rest-auth/login/")

     return fetch('/dj-rest-auth/login/', {
       method: 'POST',
       //credentials: 'omit', // default is omit
       headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json',
       },
       body:  JSON.stringify({username, password})
     }).then(resp => {
       console.log("DEBUG: response: ", resp)
        if (resp.ok){
          return resp.json()
        }
        return String(
          `Responce (${resp.ok}) status: ${resp.status} ${resp.statusText}.`
          +`${(resp.status === 400) ? " Check credentials." : ""}`)

     }).then(data => {
       console.log("DEBUG login json response: ", data);
       this.handleAuthResponse(data)
     }).catch(error => {
       this.setState({authResp: "Exception catched: " + String(error)})
       console.log('ERROR: ', String(error))
     })
   }
   // wrong credentials may fall with https://github.com/Tivix/django-rest-auth/issues/493


   requestRegister(event) {
      event.preventDefault(); // prevents a browser reload/refresh on event
      var username = this.state.username
      var password1 = this.state.password
      var password2 = this.state.password
      //var password_hash = CryptoJS.SHA3(password, { outputLength: 224 })
      //var password_hash_str = password_hash.toString(CryptoJS.enc.Base64);
      console.log("DEBUG: fetching /dj-rest-auth/registration/")

     return fetch('/dj-rest-auth/registration/', {
       method: 'POST',
       //credentials: 'omit', // default is omit
       headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json',
       },
       body:  JSON.stringify({username, password1, password2})
     }).then(resp => {
       console.log("DEBUG: response: ", resp)
        if (resp.ok){
          return resp.json()
        }
        return String(
          `Responce (${resp.ok}) status: ${resp.status} ${resp.statusText}`)
     }).then(data => {
       console.log(data);
       this.handleAuthResponse(data)
     }).catch(error => {
       this.setState({authResp: "Exception catched: " + String(error)})
       console.log('ERROR: ', String(error))
     })
   }

   render() {
       return (
       <div>
         {CheckAuth() ? <Redirect to="/"/> : null }
           <div className="centered">
              <p><Greeting isLoggedIn={CheckAuth()} /></p>
           </div>
           {/*<Card className="card-login login-main-card" style={{ width: '18rem' }}>*/}
           <Card className="login-main-card">
               <Card.Body>
               {/*}<Card.Title><h2>LOGIN</h2></Card.Title>*/}
                   <Form className = "login-main-form">
                      <Form.Group>
                           <Form.Control placeholder ="Username"
                                         name = "username"
                                         size = "sm"  className = "login-username-input"
                                         value = {this.state.username}
                                         onChange = {this.handleTextChange}/>
                       </Form.Group>
                        <Form.Group>
                          <InputGroup>
                            <Form.Control  type = {(this.state.showPass) ? "text" : "password"}
                                           placeholder="Password"
                                           name = "password"
                                           size = "sm" className = "login-password-input"
                                           value = {this.state.password}
                                           onChange = {this.handleTextChange}/>
                            {/*https://react-bootstrap.github.io/components/input-group/*/}
                            <InputGroup.Append className="show-pass-checkbox">
                               <InputGroup.Checkbox 
                                  aria-label="Show/hide password"
                                  checked={this.state.showPass}
                                  onChange={this.handleShowPass}/>
                            </InputGroup.Append>
                          </InputGroup>
                       </Form.Group>
                   {/*https://react-bootstrap.github.io/components/buttons/*/}
                   {isCompactView() ?
                    <div>
                      <ButtonToolbar className="centered">
                         <Button variant ="outline-success"
                                 size="sm"
                                 className="centered-button"
                                 value="Login"
                                 onClick={this.requestLogin}>Login
                         </Button>
                      </ButtonToolbar>
                      <ButtonToolbar className="centered-toolbar">
                         <Button variant ="outline-secondary"
                                 size="sm"
                                 className="centered-button"
                                 value="Demo"
                                 onClick={this.requestAnonimous}>Anonymous
                         </Button>
                      </ButtonToolbar>
                      <ButtonToolbar className="centered">
                         <Button variant ="outline-info"
                                 size="sm"
                                 className="centered-button"
                                 value="Register"
                                 onClick={this.requestRegister}>Register
                         </Button>
                      </ButtonToolbar>
                    </div>
                    :
                        <ButtonToolbar className="justify-content-between">
                         <ButtonGroup className="centered">
                         <Button variant ="outline-success" size="sm"
                                 value="Login"
                                 onClick={this.requestLogin}>Login
                         </Button>
                         </ButtonGroup><br />
                         <ButtonGroup className="centered">
                         <Button variant ="outline-secondary" size="sm"
                                 value="Demo"
                                 onClick={this.requestAnonimous}>Anonymous
                         </Button>
                         </ButtonGroup><br />
                         <ButtonGroup className="centered">
                         <Button variant ="outline-info" size="sm"
                                 value="Register"
                                 onClick={this.requestRegister}>Register
                         </Button>
                         </ButtonGroup>
                         </ButtonToolbar>
                        }
                   </Form>
               </Card.Body>
           </Card>
           <div className="centered">
             {this.state.authResp &&
               <div className={'response'}>
                 <code>
                   {JSON.stringify(this.state.authResp)}
                 </code>
               </div>
             }
           </div>
       </div>)
   }
}

export default Login;
