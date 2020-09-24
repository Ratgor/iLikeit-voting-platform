import React, { Component } from "react";

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      httpStatus: null,
      placeholder: "Loading..."
    };
  }


  componentDidMount() {
    fetch("/api/about", {
          headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
      })
      .then(response => {
        var httpStatus = response.status;
        this.setState(() => { return {httpStatus: httpStatus}});
        console.log(`DEBUG: fetching "api/about", http status code ${httpStatus}`);
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
              loaded: true
            };
          });
        }
      });
  }


  render() {
    console.log(`DEBUG: rendering "api/about", loaded: ${this.state.loaded}`);
    return (
      <div>
        <h2>ABOUT</h2>
        <p>Here the app "about" short blog should be</p>
        {(this.state.loaded) ?
          <ul>
            {this.state.data.map(post => {
              return (
                <div>
                <li key={post.id}>
                  <p>{post.date.substring(0,10)} by {post.author} ({post.contact}):</p>
                  <span style={{whiteSpace: 'pre-line'}}>{post.text}</span>
                </li>
                </div>
              );
            })}
          </ul>
        :
        <div>
          <p>{this.state.placeholder}</p>
        </div>
        }
      </div>
    );
  }
}

export default About;
