import React, { Component, useState } from "react";
import { Button, Form, Card, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import "./Login.css";
import CheckAuth, {Greeting } from "./CheckAuth";

class Login extends Component {
   constructor(props) {
       super(props)

       this.state = {
           username: "",
           password: ""
       }
       this.handleChange = this.handleChange.bind(this)
       this.handleLogin = this.handleLogin.bind(this)
   }

   handleChange(event) {
       //console.log(event.target.name)
       this.setState({[event.target.name]: event.target.value})
   }


   handleLogin() {
     const user = {
       username: this.state.username,
       password: this.state.password
     }

   const url = 'http://localhost:9000/api/login'

   localStorage.setItem('isLoggedIn', true)
   this.props.history.push("/")
        //this.props.handleRerender()
       //this.props.setAuth(!(this.props.isLoggedIn))

       /*
       fetch(url, {
           method: 'POST',
           credentials: 'include',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(user)
       })
       .then((response) => response.json())
       .then((data) => {
           if (data.status === 1) {
               this.props.history.push('/feed')
           }
           console.log(data)
       })
       .catch((error) => {
           console.log('Error', error)
       })
       */
   }


   render() {
       return (
       <div>
         {CheckAuth() ? <Redirect to="/"/> : null }
           <h2>LOGIN</h2>
           <p>(just click the button below,<br/>
              no credentials are rejuired)</p>
           <Card className="card-login" style={{ width: '18rem' }}>
               <Card.Body>
               {/*}<Card.Title><h2>LOGIN</h2></Card.Title>*/}
                   <Form>
                       <Form.Group>
                           <Form.Control placeholder ="Username"
                                         name = "username"
                                         value = {this.state.username}
                                         onChange = {this.handleChange}/>
                       </Form.Group>
                       <Form.Group>
                           <Form.Control type ="password"
                                         placeholder="Password"
                                         name = "password"
                                         value = {this.state.password}
                                         onChange = {this.handleChange} />
                       </Form.Group>
                   <Button variant ="primary"
                           value="Submit"
                           onClick={this.handleLogin}>Login
                   </Button>
                   </Form>
               </Card.Body>
           </Card>
           <Greeting isLoggedIn={CheckAuth()} />
       </div>)
   }
}

export default Login;
