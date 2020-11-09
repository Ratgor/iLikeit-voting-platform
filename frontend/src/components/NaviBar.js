import React, { Component } from "react";
import CheckAuth from "./CheckAuth";

import "./NaviBar.css"
import logo from "./NaviBar_logo.png";

// for event listening and rerender
import { withRouter } from "react-router-dom"

// for higlighting with activeClassName, two ways
// import { NavLink } from "react-router-dom"
import { Link, NavLink } from "react-router-dom"; // + tag={Link}
// Attempted import error: 'Link' is not exported from 'react-router'.
// restart the dev server, https://stackoverflow.com/questions/55331898/how-to-fix-error-attempted-import-error-route-is-not-exported-from-react-ro

import {
  Navbar,
  Nav,
  Button,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";

import { isCompactView } from "./isCompactView"

class NaviBar extends Component {

  componentDidMount(){
    this.props.history.listen(()=>{
      this.forceUpdate()
    })
  }

  render() {
    const isAuthorised = CheckAuth()
    return(
      <Navbar
        bg="light"
        expand="lg"
        className={isCompactView() ? "compact-styled-navbar" : "custom-styled-navbar"}
      >
        <NavLink to="/user" className="custom-styled-brand" activeClassName="active-brand">
          <img src={logo} className="App-logo" alt={isAuthorised ?"User":"Pikker"}/>
        </NavLink>
        <NavLink to="/people" className="custom-styled-navlink" activeClassName="active-navlink">People</NavLink>
        <NavLink to="/ideas" className="custom-styled-navlink" activeClassName="active-navlink">Ideas</NavLink>
        <NavLink to="/time" className="custom-styled-navlink" activeClassName="active-navlink">Time</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <InputGroup size="sm" className="mr-sm-2 custom-search-bar">
            <FormControl
              type="text"
              placeholder="text, #tag, or category"
              name="search"
              value={null}
              onCahge={null}
            />
            <InputGroup.Append>
              <Button variant="dark">Search</Button>
            </InputGroup.Append>
          </InputGroup>
        </Navbar.Collapse>
      </Navbar>
    );
  }
/*
search #1 https://stackoverflow.com/questions/14225601/django-form-to-query-database-models
store json #1 https://stackoverflow.com/questions/56167659/saving-json-data-to-a-django-model
user add model fields https://stackoverflow.com/questions/34907014/django-allow-user-to-add-fields-to-model

!!! navbar toggle/collapse CSS https://stackoverflow.com/questions/43924803/set-custom-collapse-width-for-react-bootstrap-navbar
*/


/*
//old version:

  render() {
    const isAuthorised = CheckAuth()
    return(
      <Navbar bg="light" expand="lg"
              className={isCompactView() ? "compact-styled-navbar" : "custom-styled-navbar"}>
        {isAuthorised ?
          <Navbar.Brand href="/user"><img src={logo} className="App-logo" alt="logo" aria-controls="basic-navbar-nav" />User</Navbar.Brand>
        :
          <Navbar.Brand href="/login"><img src={logo} className="App-logo" alt="logo" aria-controls="basic-navbar-nav" />User</Navbar.Brand>
        }
        <Nav.Link href="/people" className="custom-styled-navlink">People</Nav.Link>
        <Nav.Link href="/ideas" className="custom-styled-navlink">Ideas</Nav.Link>
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
              <Nav.Link href="/timetable">Timetable</Nav.Link>
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
*/

}

export default withRouter(NaviBar)
