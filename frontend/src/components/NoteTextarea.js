// controlled component textarea
// by the example https://ru.reactjs.org/docs/forms.html
import React from "react";

import "./NoteTextarea.css"

import { userEncrText, userDecrText } from "./userHash";

class NoteTextarea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      frozen: true,
      encrypted: true,
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleEncryptCheckbox = this.handleEncryptCheckbox.bind(this)
    this.handleEditButton = this.handleEditButton.bind(this);
    this.handleSaveButton = this.handleSaveButton.bind(this);
    this.handleDeleteButton = this.handleDeleteButton.bind(this);
    this.handleCancelButton = this.handleCancelButton.bind(this);
    //this.requestAddNote = this.requestAddNote.bind(this);
  }

  componentDidMount(){
    this.setState({encrypted: this.props.note.encrypted !== undefined ?
      this.props.note.encrypted : this.state.encrypted})
    this.setState({text: this.props.note.encrypted === true ?
      userDecrText(this.props.note.text) : this.props.note.text })
    this.setState({frozen: this.props.frozen !== undefined ?
      this.props.frozen : true })
  }

  handleTextChange(event) {
    this.setState({text: event.target.value});
  }

  handleEncryptCheckbox(event){
    //event.preventDefault(); // is this required?
    this.setState({encrypted: event.target.checked});
    //this.props.callback(this)
    //this.handleSaveButton(event)
  }

  handleEditButton(event) {
    event.preventDefault();
    this.setState({frozen: false});
  }

  handleCancelButton(event) {
    event.preventDefault();
    this.setState({text: this.state.encrypted === true ?
      userDecrText(this.props.note.text) : this.props.note.text})
    this.setState({frozen: true});
  }

  handleSaveButton(event) {
    console.log("DEBUG: noteId ", this.props.note.id, "encrypted ", this.state.encrypted)
    if (this.props.note.id !== undefined){
      this.requestNoteEdit(this.props.note.id,
                           this.state.encrypted ?
                              userEncrText(this.state.text) : this.state.text,
                           this.props.note.owner,
                           this.state.encrypted)
    } else {
      this.requestNoteAdd(this.state.encrypted ?
                            userEncrText(this.state.text) : this.state.text,
                          this.props.note.owner,
                          this.state.encrypted)
      this.setState({text: ""})
    }
    this.setState({frozen: true});
    this.props.callback(this)
  }

  handleDeleteButton(event) {
    if(this.props.note.id !== undefined){
      this.requestNoteDelete(this.props.note.id)
    } else { // else - refresh to initial state
      this.setState({text: this.props.note.text})
    }
    this.props.callback(this)
  }


  requestNoteAdd(text, owner, encrypted){
    const authTokenHeader = localStorage.getItem('authTokenHeader');
    let url = "/api/notes/"
    let headers = {"Content-Type": "application/json",
                   'Authorization': authTokenHeader,}
    let body = JSON.stringify({text, owner, encrypted, })
    return fetch(url, {method: "POST", headers, body})
      .then(resp => resp.json())
      .then(note => {console.log(JSON.stringify(note))})


/* from http://v1k45.com/blog/modern-django-part-3-creating-an-api-and-integrating-with-react/
 return dispatch => {
      let headers = {"Content-Type": "application/json"}
      let body = JSON.stringify({text, owner, })
      console.log("2"+text)
      return fetch("/api/notes/", {headers, method: "POST", body})
        .then(resp => resp.json())
        .then(note => {
          return dispatch({
            type: 'ADD_NOTE',
            note
          })
        })
    }*/
  }

  requestNoteDelete(noteId){
    // improve the call https://stackoverflow.com/questions/29810914/react-js-onclick-cant-pass-value-to-method
    let url = `/api/notes/${noteId}/`
    const authTokenHeader = localStorage.getItem('authTokenHeader');
    let headers = {"Content-Type": "application/json",
                   'Authorization': authTokenHeader,}
    let body = "{}"
    return fetch(url, {method: "DELETE", headers, body})
      .then(resp => {
        console.log("DEBUG responce on note delete:", resp);
        if (resp.ok){
          console.log(`DELETED: ${url}`);
        } else {
          console.log(`FAILED to delete: ${url}`);
        }
      })

/*    export const deleteNote = index => {
  return (dispatch, getState) => {

    let headers = {"Content-Type": "application/json"};
    let noteId = getState().notes[index].id;

    return fetch(`/api/notes/${noteId}/`, {headers, method: "DELETE"})
      .then(res => {
        if (res.ok) {
          return dispatch({
            type: 'DELETE_NOTE',
            index
          })
        }
      })
  }
}
    }*/
  }

  requestNoteEdit(noteId, text, owner, encrypted){
    const authTokenHeader = localStorage.getItem('authTokenHeader');
    let url = `/api/notes/${noteId}/`
    let headers = {"Content-Type": "application/json",
                   'Authorization': authTokenHeader,}
    let body = JSON.stringify({text, owner, encrypted, })
    return fetch(url, {method: "PUT", headers, body})
      .then(resp => resp.json())
      .then(note => {console.log(JSON.stringify(note))})

    /*
    return (dispatch, getState) => {

      let headers = {"Content-Type": "application/json"};
      let body = JSON.stringify({text, });
      let noteId = getState().notes[index].id;

      return fetch(`/api/notes/${noteId}/`, {headers, method: "PUT", body})
        .then(res => res.json())
        .then(note => {
          return dispatch({
            type: 'UPDATE_NOTE',
            note,
            index
          })
        })
    }
    }*/

  }


  render() {
    return (

      <div className="notes-top-div">

          <textarea
            className="notes-textarea"
            disabled={this.state.frozen}
            value={this.state.text}
            onChange={this.handleTextChange}
          />

        { this.state.frozen ?
          <div>
            <button
              className="notes-edit-btn"
              onClick={this.handleEditButton}>
                edit
            </button>
            <button
              className="notes-delete-btn"
              onClick={this.handleDeleteButton}>
                {this.props.note.id !== undefined ? "del" : "clear"}
            </button>
            <span className="notes-encrypted-checkbox">
              <input
                type="checkbox"
                className="notes-encrypted-checkbox"
                checked={this.state.encrypted}
                onChange={this.handleEncryptCheckbox}
                disabled={this.state.frozen}>
              </input>
              <label>encrypted</label>
            </span>
          </div>
        :
          <div>
            <button value="save"
              className="notes-save-btn"
              onClick={this.handleSaveButton}>
                save
            </button>
            <button value="cancel"
              className="notes-cancel-btn"
              onClick={this.handleCancelButton}>
                cancel
            </button>
            <span className="notes-encrypted-checkbox">
              <input
                type="checkbox"
                className="notes-encrypted-checkbox"
                checked={this.state.encrypted}
                onChange={this.handleEncryptCheckbox}
                disabled={this.state.frozen}>
              </input>
              <label>encrypt</label>
            </span>
          </div>
        }

      </div>
    );
  }
}

export default NoteTextarea;
