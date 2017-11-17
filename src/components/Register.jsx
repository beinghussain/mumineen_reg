import React, { Component } from "react";
import background from "../background.svg";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Card, TextField, RaisedButton, LinearProgress } from "material-ui";
import Cleave from "cleave.js";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    phone: "",
    nameError: "",
    passwordError: "",
    emailError: "",
    phoneError: ""
  };
  componentDidMount() {}
  handleName = e => {
    this.setState({
      name: e.target.value.toLowerCase(),
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

  handlePhone = e => {
    if (cleave) {
      var cleave = new Cleave(".phone input", {
        prefix: "+91 ",
        delimiter: "-",
        uppercase: true
      });
    }
    this.setState({
      phone: e.target.value
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
        nameError: "Please enter a valid username"
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

    const { vName, vEmail, vPass } = this;
    if (vName() && vEmail() && vPass()) {
      this.setState({
        loading: true
      });

      setTimeout(() => {
        this.setState({
          loading: false
        });
      }, 2000);
    }
  };
  render() {
    return (
      <div className="App">
        <div className="root">
          <div className="formContainer">
            <div className="formCardContainer">
              {this.state.loading ? <LinearProgress className="loadingBar" mode="indeterminate" /> : null}
              <div className="formCard">
                <div className="logoAndHeaderContainer">
                  <h2 className="RegisterHeading">Register as a seller</h2>
                  <span className="subHeader">Website is not laucnhed yet. This is pre-registrations for all those Mumineen who want to sell their products online</span>
                </div>
                <div>
                  <TextField errorText={this.state.nameError} onChange={this.handleName} value={this.state.name} spellCheck={false} type="text" className="TextField" fullWidth floatingLabelText="Username" hintText="Username" />
                  <TextField errorText={this.state.emailError} onChange={this.handleEmail} value={this.state.email} spellCheck={false} type="email" className="TextField" fullWidth floatingLabelText="Email address" hintText="Email address" />
                  <TextField errorText={this.state.passwordError} autoComplete="new-password" onChange={this.handlePassword} value={this.state.password} spellCheck={false} type="password" className="TextField" floatingLabelText="Password" fullWidth hintText="Password" />
                  <TextField onFocus={this.setPrefix} errorText={this.state.phoneError} autoComplete="new-password" onChange={this.handlePhone} value={this.state.phone} spellCheck={false} type="phone" className="TextField phone" floatingLabelText="Phone" fullWidth />
                  <RaisedButton onClick={this.handleNext} primary={true} label="next" className="nextButton" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
