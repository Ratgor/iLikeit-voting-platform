import React, { Component } from "react";
import { FormGroup, FormControl, InputGroup, Button, Collapse } from "react-bootstrap"

//import { requestCountAllNotes } from "./notesRequests"
import { ColoredHrLine } from "./ColoredHrLine"
import About from "./About"
import Notes from "./Notes"

class Ideas extends Component {
  constructor(props){
    super(props)

    this.state = {
      aboutsOpen: false,
      notesOpen: false,
      notesCount: "?",
      aboutsCount: "?",
      httpStatus: null,
    }

    this.setAboutsOpen = this.setAboutsOpen.bind(this)
    this.setNotesOpen = this.setNotesOpen.bind(this)
    this.requestCountAllNotes = this.requestCountAllNotes.bind(this)
    this.requestCountAllAbouts = this.requestCountAllAbouts.bind(this)
  }

  setAboutsOpen(){
    this.setState({aboutsOpen: (!this.state.aboutsOpen)})
  }

  setNotesOpen(){
    this.setState({notesOpen: (!this.state.notesOpen)})
  }
/*
  setNotesCount(){
    const authTokenHeader = localStorage.getItem('authTokenHeader');
    //()=>(async () => {return await Notes.requestCountAllNotes()})
    requestCountAllNotes(authTokenHeader)
    .then(count => {
      this.setState({notesCount: count})
      console.log("DEBUG parent ^^^^^^ items count:", count);
    })

    //this.setState(notesCount => ({notesCount: requestCountAllNotes(authTokenHeader)}))

  }
*/
/*
  async componentDidMount(){
    //this.setNotesCount()
    const authTokenHeader = localStorage.getItem('authTokenHeader');
    try {
      const response = await fetch("/api/notes/count", {
                method: "GET",
                headers:{
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': authTokenHeader,
                }
            })
      const json = await response.json();
      this.setState({ notesCount: json.count });
    } catch (error) {
      console.log(error);
    }
  }
*/

  requestCountAllNotes() {
    const authTokenHeader = localStorage.getItem('authTokenHeader');
    fetch("/api/notes/count", {
          method: "GET",
          headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': authTokenHeader,
          }
      })
      .then(response => {
        var httpStatus = response.status;
        this.setState(() => { return {httpStatus: httpStatus}});
        console.log(`DEBUG: fetching "/api/notes/count", http status code ${httpStatus}`);
        if (httpStatus >= 400) {
          return this.setState(() => {
            return "Loading failed!";
          });
        }
        return response.json();
      })
      .then(data => {
        if (this.state.httpStatus === 200) {
          console.log("DEBUG data count: ", data.count)
          this.setState(() => {
            return {
              notesCount: data.count
            };
          });
        }

      });
  }

  requestCountAllAbouts() {
    const authTokenHeader = localStorage.getItem('authTokenHeader');
    fetch("/api/about/count", {
          method: "GET",
          headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': authTokenHeader,
          }
      })
      .then(response => {
        var httpStatus = response.status;
        this.setState(() => { return {httpStatus: httpStatus}});
        console.log(`DEBUG: fetching "/api/abouts/count", http status code ${httpStatus}`);
        if (httpStatus >= 400) {
          return this.setState(() => {
            return "Loading failed!";
          });
        }
        return response.json();
      })
      .then(data => {
        if (this.state.httpStatus === 200) {
          console.log("DEBUG data count: ", data.count)
          this.setState(() => {
            return {
              aboutsCount: data.count
            };
          });
        }

      });
  }

  componentDidMount(){
    this.requestCountAllAbouts()
    this.requestCountAllNotes()
  }



  render() {
    console.log("DEBUG parent ^^^ count: ", this.state.notesCount)
    return (
      <div>
        {/*}<h2>IDEAS</h2>*/}
        <p>Here the list of notes and ideas should be</p>

        <ColoredHrLine color="gray" height="1px"/>

        <div>
          <Button
            variant="outline-dark" size="sm"
            onClick={this.setAboutsOpen}
            aria-controls="abouts-collapsible"
            aria-expanded={this.state.aboutsOpen}
          >
            Abouts ({this.state.aboutsCount} items)
          </Button>
          <Collapse in={this.state.aboutsOpen}>
            <div id="abouts-collapsible">
              <About/>
            </div>
          </Collapse>
        </div>

        <ColoredHrLine color="gray" height="1px"/>

        <div>
          <Button
            variant="outline-dark" size="sm"
            onClick={this.setNotesOpen}
            aria-controls="abouts-collapsible"
            aria-expanded={this.state.notesOpen}
          >
            Notes ({this.state.notesCount} items)
          </Button>
          <Collapse in={this.state.notesOpen}>
            <div id="abouts-collapsible">
              <Notes/>
            </div>
          </Collapse>
        </div>

      </div>
    );
  }
}

export default Ideas;
