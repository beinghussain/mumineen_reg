import React, { Component } from "react";
import background from "../background.svg";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Card, TextField, RaisedButton, LinearProgress } from "material-ui";
import Cleave from "cleave.js";
import $ from "jquery";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    phone: "",
    nameError: "",
    passwordError: "",
    emailError: "",
    phoneError: "",
    fullName: "",
    address: "",
    pincode: "",
    city: ""
  };

  componentDidMount() {
    if (this.props.match.params.step === "1") {
      var cleave = new Cleave(".phone input", {
        numericOnly: true,
        delimiter: "  ",
        prefix: "+91 ",
        blocks: [14]
      });
    }

    if (this.props.location.state) {
      const { username, email, password, phone } = this.props.location.state;
      this.setState({
        username,
        email,
        password,
        phone
      });
    }
  }

  handleName = e => {
    this.setState({
      username: e.target.value.toLowerCase(),
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
    const { password } = this.state;
    this.setState({
      password: e.target.value,
      passwordError: ""
    });
  };

  emailVerification = email => {
    if (/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  };

  vUser = () => {
    const { username } = this.state;
    return username.length > 4 ? true : false;
  };

  vEmail = () => {
    const { email } = this.state;
    return this.emailVerification(email);
  };

  vPass = () => {
    const { password } = this.state;
    return password.length > 8 ? true : false;
  };

  vPhone = () => {
    let phoneWhole = this.refs.phone.getValue();
    let phone = phoneWhole.split(" ")[1];
    return phone.length === 10 ? true : false;
  };

  handleNext = () => {
    const { username, email, password, passwordRetype } = this.state;
    if (username === "") {
      this.setState({
        nameError: "Please enter a valid username"
      });
    }

    let phoneWhole = this.refs.phone.getValue();
    let phone = phoneWhole.split(" ")[1];
    if (phone === 0 || phone < 10) {
      this.setState({
        phoneError: "Please enter a valid phone number"
      });
    } else {
      this.setState({
        phone: phone
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

    const { vUser, vEmail, vPass, vPhone } = this;
    if (vUser() && vEmail() && vPass() && vPhone()) {
      console.log("Entering...");
      this.setState({
        loading: true
      });

      setTimeout(() => {
        this.setState({
          loading: false
        });
        let phoneWhole = this.refs.phone.getValue();
        let phone = phoneWhole.split(" ")[1];
        const { username, password, email } = this.state;
        this.props.history.push("/register/2", { username, password, email, phone });
      }, 2000);
    }
  };
  render() {
    return (
      <div className="App">
        <div className="root">
          <div className="formContainer">
            {this.props.match.params.step === "1" ? (
              <div className="formCardContainer">
                {this.state.loading ? <LinearProgress className="loadingBar" mode="indeterminate" /> : null}
                <div className="formCard">
                  <div className="logoAndHeaderContainer">
                    <h2 className="RegisterHeading">Register as a seller</h2>
                    <span className="subHeader">All fields are mandatory</span>
                  </div>
                  <div>
                    <TextField errorText={this.state.nameError} onChange={this.handleName} value={this.state.username} spellCheck={false} type="text" className="TextField" fullWidth floatingLabelText="Username" hintText="Username" />
                    <TextField errorText={this.state.emailError} onChange={this.handleEmail} value={this.state.email} spellCheck={false} type="email" className="TextField" fullWidth floatingLabelText="Email address" hintText="Email address" />
                    <TextField errorText={this.state.passwordError} autoComplete="new-password" onChange={this.handlePassword} value={this.state.password} spellCheck={false} type="password" className="TextField" floatingLabelText="Password" fullWidth hintText="Password" />
                    <TextField errorText={this.state.phoneError} ref="phone" className="TextField phone" floatingLabelText="Phone" floatingLabelFixed={true} fullWidth />
                    <RaisedButton onClick={this.handleNext} primary={true} label="next" className="nextButton" />
                  </div>
                </div>
              </div>
            ) : null}
            {this.props.match.params.step === "2" ? (
              <div className="formCardContainer">
                {this.state.loading ? <LinearProgress className="loadingBar" mode="indeterminate" /> : null}
                <div className="formCard">
                  <div className="logoAndHeaderContainer">
                    <h2 className="RegisterHeading">Register as a seller</h2>
                    <span className="subHeader">All fields are mandatory</span>
                  </div>
                  <div>
                    <TextField onChange={this.handleFullName} value={this.state.fullname} spellCheck={false} type="text" className="TextField" fullWidth floatingLabelText="Full name" hintText="Full name" />
                    <TextField multiLine={true} rows={3} onChange={this.handleAddress} value={this.state.address} spellCheck={false} type="text" className="TextField" fullWidth floatingLabelText="Address" hintText="Address" />
                    <TextField onChange={this.handleCity} value={this.state.city} spellCheck={false} type="email" className="TextField" fullWidth floatingLabelText="City" hintText="Enter your city" />
                    <TextField onChange={this.handlePincode} value={this.state.pincode} spellCheck={false} className="TextField" floatingLabelText="Pincode" fullWidth hintText="Enter 6 digit pincode" />
                    <RaisedButton onClick={this.handleNext} primary={true} label="next" className="nextButton" />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
