import React, { Component } from "react";
import "./global.css";
import background from "./background.svg";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Card, TextField, RaisedButton } from "material-ui";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider className="App">
        <div className="root">
          <div className="backgroundContainer" aria-hidden="true">
            <img alt="background" src={background} />
          </div>
          <div className="formContainer">
            <div>
              <Card className="formCard">
                <div className="logoAndHeaderContainer">
                  <h2>Register as a seller</h2>
                </div>
                <div>
                  <TextField className="TextField" fullWidth floatingLabelText="Your Name" hintText="Your Name" />
                  <TextField className="TextField" fullWidth floatingLabelText="Email address" hintText="Email address" />
                  <TextField className="TextField" multiLine floatingLabelText="Password" fullWidth hintText="Password" />
                  <TextField className="TextField" multiLine floatingLabelText="Retype Password" fullWidth hintText="Retype Password" />
                  <RaisedButton primary={true} label="next" className="nextButton" />
                </div>
              </Card>
              <div className="footerContainer">
                <span>Copyright 2017 | Mumineen Shop</span>
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
