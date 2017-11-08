import React, { Component } from "react";
import background from "../background.svg";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Card, TextField, RaisedButton, LinearProgress } from "material-ui";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    passwordRetype: "",
    nameError: "",
    passwordError: "",
    emailError: "",
    passwordMatchError: ""
  };
  handleName = e => {
    this.setState({
      name: e.target.value,
      nameError: ""
    });
  };
  handleEmail = e => {
    this.setState({
      email: e.target.value,
      emailError: ""
    });
  };
  handlePassword = e => {
    const { password, passwordRetype } = this.state;
    this.setState({
      password: e.target.value,
      passwordError: ""
    });
    if (password === passwordRetype) {
      this.setState({
        passwordMatchError: ""
      });
    }
  };
  handlePasswordRetype = e => {
    this.setState({
      passwordRetype: e.target.value,
      passwordMatchError: ""
    });
  };
  emailVerification = email => {
    if (/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  };

  vName = () => {
    const { name } = this.state;
    return name.length > 4 ? true : false;
  };

  vEmail = () => {
    const { email } = this.state;
    return this.emailVerification(email);
  };

  vPass = () => {
    const { password, passwordRetype } = this.state;
    return password.length > 8 && password === passwordRetype ? true : false;
  };

  handleNext = () => {
    const { name, email, password, passwordRetype } = this.state;
    if (name === "") {
      this.setState({
        nameError: "Please enter a valid name"
      });
    }

    if (password === "") {
      this.setState({
        passwordError: "Please enter password"
      });
    } else if (password.length < 8) {
      this.setState({
        passwordError: "Password should be more than 8 characters"
      });
    }

    if (passwordRetype === "") {
      this.setState({
        passwordMatchError: "Please enter password"
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

    if (password !== passwordRetype) {
      this.setState({
        passwordMatchError: "Password should match"
      });
    }

    const { vName, vEmail, vPass } = this;
    if (vName() && vEmail() && vPass()) {
      this.setState({
        loading: true
      });

      setTimeout(() => {
        this.props.history.push("/");
      }, 1000);
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
            <div className="formCardContainer">
              {this.state.loading ? <LinearProgress className="loadingBar" mode="indeterminate" /> : null}

              <Card className="formCard">
                <div className="logoAndHeaderContainer">
                  <h2 className="RegisterHeading">Register as a seller</h2>
                  <span className="subHeader">Website is not laucnhed yet. This is pre-registrations for all those Mumineen who want to sell their products online</span>
                </div>
                <div>
                  <TextField errorText={this.state.nameError} onChange={this.handleName} value={this.state.name} spellCheck={false} type="text" className="TextField" fullWidth floatingLabelText="Your Name" hintText="Your Name" />
                  <TextField errorText={this.state.emailError} onChange={this.handleEmail} value={this.state.email} spellCheck={false} type="email" className="TextField" fullWidth floatingLabelText="Email address" hintText="Email address" />
                  <TextField errorText={this.state.passwordError} autoComplete="new-password" onChange={this.handlePassword} value={this.state.password} spellCheck={false} type="password" className="TextField" floatingLabelText="Password" fullWidth hintText="Password" />
                  <TextField errorText={this.state.passwordMatchError} autoComplete="new-password" onChange={this.handlePasswordRetype} value={this.state.passwordRetype} spellCheck={false} type="password" className="TextField" floatingLabelText="Retype Password" fullWidth hintText="Retype Password" />
                  <RaisedButton onClick={this.handleNext} primary={true} label="next" className="nextButton" />
                </div>
              </Card>
            </div>
          </div>
          <div className="footerContainer">
            <span className="footerText">Copyright 2017 | Mumineen Shop</span>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Register;
