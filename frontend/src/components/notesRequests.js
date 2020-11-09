import React, { Component } from "react";

export const requestCountAllNotes = async function (authTokenHeader) {
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
        //this.setState(() => { return {httpStatus: httpStatus}});
        console.log(`DEBUG: fetching "/api/notes/count", http status code ${httpStatus}`);
        if (httpStatus >= 400) {
          return this.setState(() => {
            return "Loading failed!";
          });
        }
        return response.json();
      })
      .then(data => {
        /*
        if (this.state.httpStatus === 200) {
          console.log("DEBUG data count: ", data.count)
          this.setState(() => {
            return {
              dataCount: data.count
            };
          });
        }
        */
        console.log("DEBUG items count: ", data.count)
        return data.count
      });
  }
