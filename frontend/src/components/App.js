import React, { Component } from "react";

/* The following line can be included in your src/index.js or App.js file */
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  Route,
  BrowserRouter as Router, // HashRouter alternetive
  Switch,
  Redirect
} from "react-router-dom";

import NaviBar from "./NaviBar";
import Login from "./Login";
import User from "./User";
import People from "./People";
import Ideas from "./Ideas";
import Notes from "./Notes";
import AddIdea from "./AddIdea";
import AddPerson from "./AddPerson";
import Timetable from "./Timetable";
import About from "./About";

import CheckAuth from "./CheckAuth";

import { isCompactView } from "./isCompactView";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
    this.setAuth = this.setAuth.bind(this);
  }

  componentDidMount(){
    document.body.style.padding =
      isCompactView() ? "1%" : "7%";
  }

  setAuth(value) {
    this.setState({
      isLoggedIn: value
    });
  }

  render() {
    return (
      <Router>
        <NaviBar/>
        <div className={isCompactView() ? "content-compact" : "content"}>
          <Switch>
            <Route exact path="/" render={
              () => <Redirect to={CheckAuth() ? "/user" : "/login"}/>}/>
            <Route exact path="/user" component={User}/>
            <Route path="/login" component={Login}/>
            <Route path="/people" component={People}/>
            <Route path="/ideas" component={Ideas}/>
            <Route path="/notes" component={Notes}/>
            <Route path="/add-person" component={AddPerson}/>
            <Route path="/add-idea" component={AddIdea}/>
            <Route path="/time" component={Timetable}/>
            <Route path="/about" component={About}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
