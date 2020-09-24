import React, { Component } from "react";
import CheckAuth from "./CheckAuth";

//import "./NaviBar.css"
import logo from "./NaviBar_logo.png";

// for event listening and rerender
import { withRouter } from "react-router-dom"

import {
  Navbar,
  Nav
} from 'react-bootstrap';

import {
  Button,
  Form,
  FormControl
} from "react-bootstrap";


class NaviBar extends Component {

  componentDidMount(){
    this.props.history.listen(()=>{
      this.forceUpdate()
    })
  }

  render() {
    const isAuthorised = CheckAuth()
    return(
      <Navbar bg="light" expand="lg">
        {isAuthorised ?
          <Navbar.Brand href="/account"><img src={logo} className="App-logo" alt="logo" />Account</Navbar.Brand>
        :
          <Navbar.Brand href="/login"><img src={logo} className="App-logo" alt="logo" />Login</Navbar.Brand>
        }
        <Nav.Link href="/people">People</Nav.Link>
        <Nav.Link href="/ideas">Ideas</Nav.Link>
        {isAuthorised ?
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        :
          <Nav.Link href="/about">About</Nav.Link>
        }
        {isAuthorised ?
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/notes">Notes</Nav.Link>
              <Nav.Link href="/add-person">Add a person</Nav.Link>
              <Nav.Link href="/add-idea">Add an idea</Nav.Link>
              <Nav.Link href="/timetable">Timemtable</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        :
          null
        }
      </Navbar>
    );
  }


}

export default withRouter(NaviBar)
