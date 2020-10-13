// controlled component textarea
// by the example https://ru.reactjs.org/docs/forms.html
import React from "react";

import "./TextareaForm.css"

class TextareaForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(event, this.state.value);
  }

      //{/*<form onSubmit={this.handleSubmit}>*/}
  render() {
    return (

      <form className="tf-1">
          <textarea className="tf-2"
            value={this.state.value}
            onChange={this.handleChange}
            rows={this.props.rows ? this.props.rows : "4"}
            cols={this.props.cols ? this.props.cols : ""}
            />
        <input className="tf-3" type="submit" value="save"
        onClick={this.handleSubmit}/>
      </form>
    );
  }
}

export default TextareaForm;
