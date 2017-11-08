import React, { Component } from "react";
import background from "../background.svg";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Card, TextField, RaisedButton } from "material-ui";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    passwordRetype: ""
  };
  handleName = e => {
    this.setState({
      name: e.target.value
    });
  };
  handleEmail = e => {
    this.setState({
      email: e.target.value
    });
  };
  handlePassword = e => {
    this.setState({
      password: e.target.value
    });
  };
  handlePasswordRetype = e => {
    this.setState({
      passwordRetype: e.target.value
    });
  };
  emailVerification = email => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  };

  handleNext = () => {
    const { name, email, password, passwordRetype } = this.state;
    if (name === "") {
      this.setState({
        nameError: "Please enter a valid name"
      });
    }

    if (email === "") {
      this.setState({
        emailError: "Please enter an email"
      });
    } else {
      if (!this.emailVerification(email)) {
        this.setState({
          emailError: "Not an valid email"
        });
      }
    }
  };
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
                  <h2 className="RegisterHeading">Register as a seller</h2>
                  <span className="subHeader">Website is not laucnhed yet. This is pre-registrations for all those Mumineen who want to sell their products online</span>
                </div>
                <div>
                  <TextField errorText={this.nameError} onChange={this.handleName} value={this.state.name} spellCheck={false} type="text" className="TextField" fullWidth floatingLabelText="Your Name" hintText="Your Name" />
                  <TextField errorText={this.state.emailError} onChange={this.handleEmail} value={this.state.email} spellCheck={false} type="email" className="TextField" fullWidth floatingLabelText="Email address" hintText="Email address" />
                  <TextField autocomplete="new-password" onChange={this.handlePassword} value={this.state.password} spellCheck={false} type="password" className="TextField" floatingLabelText="Password" fullWidth hintText="Password" />
                  <TextField autocomplete="new-password" onChange={this.handlePasswordRetype} value={this.state.passwordRetype} spellCheck={false} type="password" className="TextField" floatingLabelText="Retype Password" fullWidth hintText="Retype Password" />
                  <RaisedButton onClick={this.handleNext} primary={true} label="next" className="nextButton" />
                </div>
              </Card>
              <div className="footerContainer">
                <span className="footerText">Copyright 2017 | Mumineen Shop</span>
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Register;
