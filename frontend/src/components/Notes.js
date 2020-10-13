import React, { Component } from "react";

import "./Notes.css"
import TextareaForm from "./TextareaForm"
import NoteTextarea from "./NoteTextarea"

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      httpStatus: null,
      placeholder: "Loading...",
      activeNoteId: null,
    };

    this.requestAllNotes = this.requestAllNotes.bind(this)
    this.handleRefresh = this.handleRefresh.bind(this)
  }

  handleRefresh(child){
    this.setState({activeNoteId: child.props.note.id})
    console.log("DEBUG active note id ", this.state.activeNoteId);
    this.requestAllNotes()
  }

  requestAllNotes() {
    const authTokenHeader = localStorage.getItem('authTokenHeader');
    fetch("/api/notes", {
          headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': authTokenHeader,
          }
      })
      .then(response => {
        var httpStatus = response.status;
        this.setState(() => { return {httpStatus: httpStatus}});
        console.log(`DEBUG: fetching "/api/notes", http status code ${httpStatus}`);
        if (httpStatus >= 400) {
          return this.setState(() => {
            return {
              loaded: false,
              placeholder: "Loading failed!"
            };
          });
        }
        return response.json();
      })
      .then(data => {
        if (this.state.httpStatus === 200) {
          this.setState(() => {
            return {
              data,
              loaded: true,
              placeholder: `Tolal ${Object.entries(data).length} notes loaded`
            };
          });
        }
      });
  }

  componentDidMount() {
      this.requestAllNotes()
  }

  render() {
    console.log(`DEBUG: rendering "api/notes", loaded: ${this.state.loaded}`);
    console.log(`DEBUG: data received:\n`, this.state.data);
    return (
      <div>
        <h2>NOTES</h2>
        <p>Here the tool for simple & fast notes should be</p>
        <ul>
          {(this.state.loaded &&
            Object.entries(this.state.data).length !== 0) ?
              this.state.data.map((note) =>
              <li key={note.id}>
                <p>{(note.created_at).slice(0,16).replace('T',' ')+' '}
                    by {note.owner ? note.owner : "Anonym"}:
                </p>
                <NoteTextarea note={note} callback={this.handleRefresh}/>
              </li>
          ) : <li>{this.state.placeholder}</li> }
          <li>
            <p>Input new note below:</p>
            <NoteTextarea note={{text: ""}} callback={this.handleRefresh} frozen={false}/>
          </li>
        </ul>
      </div>
    );
  }
}

export default Notes;
