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

  constructor(props) {
      super(props)

      this.state = {
          searchString: "",
          searchResults: "",
          searchLog: [],
      }
      this.handleTextChange = this.handleTextChange.bind(this)
      this.handleKeyPress = this.handleKeyPress.bind(this)
      this.requestForSearch = this.requestForSearch.bind(this)
      this.handleSearchResults = this.handleSearchResults.bind(this)
  }

  handleTextChange(event) {
      //console.log(event.target.name, event.target.value)
      this.setState({[event.target.name]: event.target.value})
  }

  handleKeyPress(event) {
    //https://stackoverflow.com/questions/34223558/enter-key-event-handler-on-react-bootstrap-input-component
    /*if(event.charCode==13){
      //alert('Enter clicked!!!');}
    */
    if (event.key === "Enter") {
      this.requestForSearch(event)
    }
  }

  handleSearchResults(data){
    console.log(this.state.searchString)
    if(this.state.searchString){
      this.setState({searchResults: data['result']})
      //var newLog = (this.state.searchString).concat(this.state.searchResults)
      //this.setState({searchResults: text})
      //this.setState({searchLog: this.state.searchLog.concat(newLog)})
      /*
      var newLine = "<p>"
      newLine += this.state.searchString
      newLine += " "
      newLine += this.state.searchResults
      //newLine += //"\r\n"
      newLine += "</p>"
      this.setState({searchLog: this.state.searchLog.concat(newLine)})
      */
      var newLogRecord = this.state.searchString +" "+ this.state.searchResults
      this.setState({searchLog:
          [newLogRecord].concat(this.state.searchLog)
      })
    }
  }

  requestForSearch(event){
    event.preventDefault();
    const authTokenHeader = localStorage.getItem('authTokenHeader');
    var searchString = this.state.searchString
    console.log("DEBUG: fetching /api/search/")

    return fetch('/api/search/',{
      method: 'POST',
      //credentials: 'omit', // default is omit
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': authTokenHeader,
      },
      body:  JSON.stringify({searchString})
    }).then(resp => {
      console.log("DEBUG search response: ", resp)
      if (resp.ok){
        return resp.json()
      }
      return String(
        `Responce (${resp.ok}) status: ${resp.status} ${resp.statusText}.`
        +`${(resp.status === 400) ? " unknown " : ""}`)
    }).then(data => {
      console.log("DEBUG search json response: ", data);
      this.handleSearchResults(data)
    }).catch(error => {
      //this.setState({authResp: "Exception catched: " + String(error)})
      console.log('ERROR: ', String(error))
    })
  }

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
        <NavLink to="/ideas" className="custom-styled-navlink" activeClassName="active-navlink">Ideas</NavLink>
        <NavLink to="/people" className="custom-styled-navlink" activeClassName="active-navlink">People</NavLink>
        <NavLink to="/time" className="custom-styled-navlink" activeClassName="active-navlink">Time</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <InputGroup size="sm" className="mr-sm-2 custom-search-bar">
            <FormControl
              type="text"
              placeholder="text, #tag, or category, e.g. 'help'"
              name="searchString"
              value={this.state.searchString}
              onChange={this.handleTextChange}
              onKeyPress={this.handleKeyPress}
            />
            <InputGroup.Append>
              <Button variant="dark"
                      onClick={this.requestForSearch}
                      >Ask
              </Button>
            </InputGroup.Append>
          </InputGroup>
          <Navbar.Text style={{paddingLeft: "7px", wordWrap: "break-word"}}>
            <ul style={{listStyleType: "none"}}>
              {console.log(this.state.searchLog)}
              {this.state.searchLog.map((result) =>
                <li>{result}</li>
              )}
            </ul>
          </Navbar.Text>
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
