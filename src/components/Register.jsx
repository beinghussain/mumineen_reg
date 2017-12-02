import React, { Component } from "react";
import { TextField, RaisedButton, AutoComplete, Checkbox, Snackbar } from "material-ui";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import icon from "../assets/mumineenshopicon.svg";
import { post } from "../libs/ajax";
import cities from "../cities.json";
import { NavigateNext } from "material-ui-icons";

class Register extends Component {
  state = {
    open: false,
    username: "",
    email: "",
    password: "",
    phone: "+91 ",
    nameError: "",
    passwordError: "",
    emailError: "",
    phoneError: "",
    fullname: "",
    address1: "",
    address1Err: "",
    address2: "",
    address2Err: "",
    pincode: "",
    pincodeErr: "",
    city: "",
    cityErr: "",
    otp: "",
    businessName: "",
    desc: "",
    sellTo: 0,
    payments: [],
    otpFailed: false,
    otpSent: false,
    otpVerified: false
  };

  componentDidMount() {
    if (this.props.match.params.step === "2") {
      if (this.props.location.state && this.props.location.state.step1 === "success") {
        const { username, email, password, phone } = this.props.location.state;
        this.setState({
          username,
          email,
          password,
          phone
        });
      } else {
        this.props.history.push("/register/1");
      }
    }
    if (this.props.match.params.step === "3") {
      if (this.props.location.state && this.props.location.state.step2 === "success") {
        const { username, password, email, phone, fullname, address1, address2, city, pincode } = this.props.location.state;
        this.setState({
          username,
          password,
          email,
          phone,
          fullname,
          address1,
          address2,
          city,
          pincode
        });
      } else {
        this.props.history.push("/register/2");
      }
    }
    if (this.props.match.params.step === "final") {
      if (this.props.location.state && this.props.location.state.step3 === "success") {
        const { username, password, email, phone, fullname, address1, address2, city, pincode, payments, desc, businessName, sellTo } = this.props.location.state;
        this.setState({
          username,
          password,
          email,
          phone,
          fullname,
          address1,
          address2,
          city,
          pincode,
          payments,
          desc,
          businessName,
          sellTo
        });
      } else {
        this.props.history.push("/register/3");
      }
    }
    if (this.props.match.params.step === "success") {
      let that = this;
      window.onpopstate = function(event) {
        that.props.history.push("/register");
      };
    }
  }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
    if (this.props.match.params.step === "2") {
      if (this.props.location.state && this.props.location.state.step1 === "success") {
        const { username, email, password, phone } = this.props.location.state;
        this.setState({
          username,
          email,
          password,
          phone
        });
      } else {
        this.props.history.push("/register/1");
      }
    }
    if (this.props.match.params.step === "3") {
      if (this.props.location.state && this.props.location.state.step2 === "success") {
        const { username, password, email, phone, fullname, address1, address2, city, pincode } = this.props.location.state;
        this.setState({
          username,
          password,
          email,
          phone,
          fullname,
          address1,
          address2,
          city,
          pincode
        });
      } else {
        this.props.history.push("/register/2");
      }
    }
    if (this.props.match.params.step === "final") {
      if (this.props.location.state && this.props.location.state.step3 === "success") {
        const { username, password, email, phone, fullname, address1, address2, city, pincode, payments, desc, businessName, sellTo } = this.props.location.state;
        this.setState({
          username,
          password,
          email,
          phone,
          fullname,
          address1,
          address2,
          city,
          pincode,
          payments,
          desc,
          businessName,
          sellTo
        });
      } else {
        this.props.history.push("/register/3");
      }
    }
  }

  checkNumOnly = input => {
    let number = input.split(" ")[1];
    if (number === "") {
      return true;
    } else {
      if (/\d$/.test(number)) {
        return true;
      } else {
        return false;
      }
    }
  };

  checkOtp = input => {
    if (input === "") {
      return true;
    } else {
      if (/\d$/.test(input)) {
        return true;
      } else {
        return false;
      }
    }
  };

  validateUsername = e => {
    if (e.target.value === "") {
      return true;
    } else {
      if (/^[A-Za-z\d]+$/.test(e.target.value)) {
        return true;
      } else {
        return false;
      }
    }
  };

  handleName = e => {
    if (this.validateUsername(e)) {
      this.setState({
        username: e.target.value.toLowerCase(),
        nameError: ""
      });
    }
  };

  validateUsernameExists = e => {
    post("validate_username", { username: e.target.value }, res => {
      if (res === "success") {
        this.setState({
          nameError: "Username already exists",
          userExists: true
        });
      } else {
        this.setState({
          userExists: false
        });
      }
    });
  };

  handleEmail = e => {
    this.setState({
      email: e.target.value.toLowerCase(),
      emailError: ""
    });
  };

  validateEmailExists = e => {
    post("validate_email", { email: e.target.value }, res => {
      if (res === "success") {
        this.setState({
          emailError: "Email already exists",
          emailExists: true
        });
      } else {
        this.setState({
          emailExists: false
        });
      }
    });
  };

  handlePassword = e => {
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
    return username.length > 4 && !this.state.userExists ? true : false;
  };

  vEmail = () => {
    const { email } = this.state;
    return this.emailVerification(email) && !this.state.emailExists;
  };

  vPass = () => {
    const { password } = this.state;
    return password.length >= 8 ? true : false;
  };

  vPhone = () => {
    const { phone } = this.state;
    return phone.length === 14 ? true : false;
  };

  handlePhone = e => {
    let phone = e.target.value;
    if (this.checkNumOnly(phone) && phone.length <= 14) {
      this.setState({
        phone,
        phoneError: ""
      });
    }

    if (phone.length === 14) {
      post("validate_phone", { phone }, res => {
        if (res === "success") {
          this.setState({
            phoneError: "Phone number already registered"
          });
        }
      });
    }
  };

  sendOtpVerifiation = () => {
    const { otp, phone } = this.state;
    post("verify_otp", { otp, phone }, res => {
      let response = JSON.parse(res);
      if (response.type === "success" && response.message === "otp_verified") {
        this.setState({
          otpVerified: true
        });
      } else if (response.type === "error" && response.message === "otp_not_verified") {
        this.setState({
          otpFailed: true
        });
      }
    });
  };

  phoneVerified = () => {
    return this.state.otpVerified;
  };

  handleOTP = e => {
    let otp = e.target.value;
    if (this.checkOtp(otp) && otp.length <= 4) {
      this.setState({
        otp: otp
      });
    }

    if (otp.length === 4) {
      setTimeout(() => {
        this.sendOtpVerifiation();
      }, 100);
    }
  };

  sendOTP = () => {
    const { phone } = this.state;
    post("validate_phone", { phone }, res => {
      if (res === "failed") {
        post("send_otp", { phone }, res => {
          let response = JSON.parse(res);
          if (response.type === "success") {
            this.setState({
              otpVerificationAuth: response.message,
              otpSent: true
            });
            setTimeout(() => {
              this.setState({
                resendOTP: true
              });
            }, 30000);
            this.setState({
              otpCounter: 30
            });
            let that = this;
            setInterval(function() {
              if (that.state.otpCounter === 0) clearInterval(this);
              else that.setState({ otpCounter: that.state.otpCounter - 1 });
            }, 1000);
          }
        });
      }
    });
  };

  reSendOTP = () => {
    const { phone } = this.state;
    if (phone.length === 14) {
      post("resent_otp", { phone }, res => {
        let response = JSON.parse(res);

        if (response.type === "success") {
          this.setState({
            otpVerificationAuth: response.message,
            otpSent: true
          });

          setTimeout(() => {
            this.setState({
              resendOTP: true
            });
          }, 30000);

          this.setState({
            otpCounter: 30
          });

          let that = this;

          setInterval(function() {
            if (that.state.otpCounter === 0) clearInterval(this);
            else that.setState({ otpCounter: that.state.otpCounter - 1 });
          }, 1000);
        }
      });
    }
  };

  handleNext = () => {
    const { username, email, password, phone } = this.state;
    if (username === "") {
      this.setState({
        nameError: "Please enter a valid username"
      });
    }
    if (phone.length < 14) {
      this.setState({
        phoneError: "Please enter a valid phone number"
      });
    } else if (phone.length === 14) {
      if (!this.state.phoneVerified) {
        this.setState({
          phoneError: "Phone number not verified"
        });
      }
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

    const { vUser, vEmail, vPass, vPhone, phoneVerified } = this;

    if (vUser() && vEmail() && vPass() && vPhone() && phoneVerified()) {
      const { username, password, email, phone } = this.state;
      let step1 = "success";
      this.props.history.push("/register/2", { username, password, email, phone, step1 });
    }
  };

  validateName = e => {
    if (e.target.value === "") {
      return true;
    }
    if (/^[A-Za-z_ ]+$/.test(e.target.value)) {
      return true;
    } else {
      return false;
    }
  };

  handleFullName = e => {
    if (this.validateName(e)) {
      this.setState({
        fullname: e.target.value,
        fullnameErr: ""
      });
    }
  };

  handleAddress1 = e => {
    this.setState({
      address1: e.target.value,
      address1Err: ""
    });
  };

  handleAddress2 = e => {
    this.setState({
      address2: e.target.value,
      address2Err: ""
    });
  };

  handleCity = e => {
    this.setState({
      cityErr: "",
      city: e
    });
  };

  handleCountry = e => {
    this.setState({
      countryErr: "",
      country: e,
      phone: e.dial_code + " "
    });
  };

  validatePincode = pincode => {
    if (pincode === "") {
      return true;
    }
    return /^[\d]+$/.test(pincode);
  };

  handlePincode = e => {
    let pincode = e.target.value;
    if (this.validatePincode(pincode) && pincode.length <= 6) {
      this.setState({
        pincode,
        pincodeErr: ""
      });
    }
  };

  handleNextStep2 = () => {
    const { fullname, address1, address2, city, pincode } = this.state;
    let validName, validAdress1, validAdress2, validCity, validPincode;

    if (fullname.length > 8 || /^[\\p{L} .'-]+$/.test(fullname)) {
      validName = true;
    } else {
      this.setState({
        fullnameErr: "Please enter a valid name "
      });
    }

    if (address1.length > 6) {
      validAdress1 = true;
    } else {
      this.setState({
        address1Err: "Please enter a valid address"
      });
    }

    if (address2.length > 6) {
      validAdress2 = true;
    } else {
      this.setState({
        address2Err: "Please enter a valid address"
      });
    }

    if (city.length > 3) {
      validCity = true;
    } else {
      this.setState({
        cityErr: "Please select a valid city"
      });
    }

    if (pincode.length === 6) {
      validPincode = true;
    } else {
      this.setState({
        pincodeErr: "Please enter a valid 6 digit pincode"
      });
    }

    if (validName && validCity && validAdress1 && validAdress2 && validCity && validPincode) {
      const { username, password, email, phone, fullname, address1, address2, city, pincode } = this.state;
      let step2 = "success";
      this.props.history.push("/register/3", { username, password, email, phone, fullname, address1, address2, city, pincode, step2 });
    }
  };

  handleDesc = e => {
    this.setState({
      desc: e.target.value,
      descErr: ""
    });
  };

  handleBusinessName = e => {
    this.setState({
      businessName: e.target.value
    });
  };

  handleDeliveryChange = (e, value) => {
    this.setState({
      sellTo: value
    });
  };

  handleNextStep3 = () => {
    let validDesc, validPayments;
    let paytm = this.paytm.state.switched;
    let bt = this.bt.state.switched;
    let cod = this.cod.state.switched;
    let other = this.other.state.switched;
    let payments = [];
    if (paytm) {
      payments.push("paytm");
    }
    if (bt) {
      payments.push("bt");
    }
    if (cod) {
      payments.push("cod");
    }
    if (other) {
      payments.push("other");
    }
    const { desc } = this.state;
    if (desc.length === 0) {
      this.setState({
        descErr: "Please enter valid business description"
      });
    } else {
      validDesc = true;
    }
    if (payments.length === 0) {
      this.setState({
        paymntErr: true
      });
    } else {
      validPayments = true;
    }

    if (validDesc && validPayments) {
      const { username, password, email, phone, fullname, address1, address2, city, pincode, desc, businessName, sellTo } = this.state;
      let step3 = "success";
      this.props.history.push("/register/final", {
        username,
        password,
        email,
        phone,
        fullname,
        address1,
        address2,
        city,
        pincode,
        payments,
        desc,
        businessName,
        sellTo,
        step3
      });
    }
  };

  register = () => {
    let agreed = this.agreement.state.switched;
    if (!agreed) {
      this.setState({
        open: true
      });
    } else {
      const { username, fullname, password, address1, phone, address2, city, pincode, email, desc, businessName, sellTo, payments } = this.state;
      post("register_user", { username, fullname, phone, password, address1, address2, city, pincode, email, desc, businessName, sellTo, payments }, res => {
        if (res !== "failed") {
          document.location = "/register/success";
        }
      });
    }
  };

  render() {
    const styles = {
      otpSuccess: {
        color: "#1ABC9C"
      },
      floatingLabelStyle: {
        color: "#1ABC9C"
      },
      otpFailed: {
        color: "#e74c3c"
      }
    };

    return (
      <div className="App">
        <Snackbar open={this.state.open} message="Please agree to terms and conditions" autoHideDuration={2000} />
        <div className="root">
          <div className="formContainer">
            {this.props.match.params.step === "success" ? (
              <div>
                <div className="formCardContainer">
                  <div className="formCard">
                    <div className="logoAndHeaderContainer">
                      <img className="logo" src={icon} alt="icon" />
                      <h2 className="RegisterHeading">Success</h2>
                      <h1 className="headerMain">Congratulations!</h1>
                      <span className="subHeader">You will soon able to sell your products online</span>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      You have successfuly registered for selling products on <a href="/">mumineenshop.com</a> where only Dawoodi bohra mumineen can sell products like Rida, Topi, Kurta, Masalla, Bags and all other products...<br />
                      <br />
                      <br />
                      <br />You will be able to start uploading your products from next week. However website will be published later.<br />
                      <br />
                      <span style={{ fontSize: 13 }}>You will get updates through email</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            {this.props.match.params.step === "1" ? (
              <div className="formCardContainer">
                <div className="formCard">
                  <div className="logoAndHeaderContainer">
                    <img className="logo" src={icon} alt="icon" />
                    <h2 className="RegisterHeading">Register as a seller</h2>
                    <h1 className="headerMain">Basic Details</h1>
                    <span className="subHeader">All fields are mandatory</span>
                  </div>
                  <div>
                    <TextField onBlur={this.validateUsernameExists} errorText={this.state.nameError} onChange={this.handleName} value={this.state.username} spellCheck={false} type="text" className="TextField" fullWidth floatingLabelText="Username" hintText="Username" />
                    <TextField onBlur={this.validateEmailExists} errorText={this.state.emailError} onChange={this.handleEmail} value={this.state.email} spellCheck={false} type="email" className="TextField" fullWidth floatingLabelText="Email address" hintText="Email address" />
                    <TextField errorText={this.state.passwordError} autoComplete="new-password" onChange={this.handlePassword} value={this.state.password} spellCheck={false} type="password" className="TextField" floatingLabelText="Password" fullWidth hintText="Password" />
                    {!this.state.otpVerified ? (
                      <div>
                        {this.state.phone.length === 14 && !this.state.otpSent ? (
                          <span onClick={this.sendOTP} className="sendOtp">
                            Send OTP
                          </span>
                        ) : null}
                        {this.state.otpSent ? (
                          <span style={{ color: !this.state.resendOTP ? "#dedede" : "" }} onClick={this.reSendOTP} className="verifyOTP">
                            Resend OTP {!this.state.resendOTP ? "in  " + this.state.otpCounter : ""}
                          </span>
                        ) : null}
                        {!this.state.otpSent ? (
                          <TextField onChange={this.handlePhone} hintText={this.state.sendingOtp ? "Sending OTP..." : "Enter 10 digit phone number"} errorText={this.state.phoneError} value={this.state.phone} className="TextField" floatingLabelText="Phone" floatingLabelFixed={true} fullWidth />
                        ) : (
                          <TextField onChange={this.handleOTP} value={this.state.otp} className="TextField otp" floatingLabelText="OTP" errorText={this.state.otpFailed ? "Invalid OTP" : "OTP has been sent on your mobile"} errorStyle={!this.state.otpFailed ? styles.otpSuccess : styles.otpFailed} floatingLabelStyle={styles.floatingLabelStyle} hintText="Enter 4 digit OTP" floatingLabelFixed={true} fullWidth />
                        )}
                      </div>
                    ) : (
                      <div>
                        <TextField value={this.state.phone} floatingLabelStyle={{ color: "#1ABC9C" }} className="TextField" floatingLabelText="OTP Successfully verified" floatingLabelFixed={true} fullWidth />
                      </div>
                    )}
                    <RaisedButton onClick={this.handleNext} icon={<NavigateNext />} primary={true} labelPosition="before" label="Continue" className="nextButton" />
                  </div>
                </div>
              </div>
            ) : null}
            {this.props.match.params.step === "2" ? (
              <div className="formCardContainer">
                <div className="formCard">
                  <div className="logoAndHeaderContainer">
                    <img className="logo" src={icon} alt="icon" />
                    <h2 className="RegisterHeading">Register as a seller</h2>
                    <h1 className="headerMain">Address</h1>

                    <span className="subHeader">All fields are mandatory</span>
                  </div>
                  <div>
                    <TextField errorText={this.state.fullnameErr} onChange={this.handleFullName} value={this.state.fullname} spellCheck={false} type="text" className="TextField" fullWidth floatingLabelText="Full name" hintText="Full name" />
                    <TextField errorText={this.state.address1Err} onChange={this.handleAddress1} value={this.state.address1} spellCheck={false} type="text" className="TextField" fullWidth floatingLabelText="Adress Line 1" hintText="House no, Society name" />
                    <TextField errorText={this.state.address2Err} onChange={this.handleAddress2} value={this.state.address2} spellCheck={false} type="text" className="TextField" fullWidth floatingLabelText="Adress Line 2" hintText="Area" />
                    <AutoComplete errorText={this.state.cityErr} onNewRequest={this.handleCity} maxSearchResults={4} filter={AutoComplete.fuzzyFilter} style={{ marginTop: 15 }} hintText="City" className="TextField" fullWidth dataSource={cities} />
                    <TextField errorText={this.state.pincodeErr} onChange={this.handlePincode} value={this.state.pincode} spellCheck={false} className="TextField" floatingLabelText="Pincode" fullWidth hintText="Enter 6 digit pincode" />
                    <RaisedButton onClick={this.handleNextStep2} primary={true} label="next" className="nextButton" />
                  </div>
                </div>
              </div>
            ) : null}
            {this.props.match.params.step === "3" ? (
              <div className="formCardContainer">
                <div className="formCard">
                  <div className="logoAndHeaderContainer">
                    <img className="logo" src={icon} alt="icon" />
                    <h2 className="RegisterHeading">Register as a seller</h2>
                    <h1 className="headerMain">Business Details</h1>
                    <span className="subHeader">All fields are mandatory</span>
                  </div>
                  <div>
                    <TextField onChange={this.handleBusinessName} value={this.state.businessName} spellCheck={false} type="text" className="TextField" fullWidth floatingLabelText="Business Name (Optional)" hintText="Enter your business name" />
                    <TextField multiLine={true} errorText={this.state.descErr} onChange={this.handleDesc} value={this.state.desc} spellCheck={false} type="text" className="TextField" fullWidth floatingLabelText="What are you selling" hintText="Eg: Rida, Topi, Women Apperals, Mens Accessories.." />
                    <p>Where do you want to sell your products</p>
                    <RadioButtonGroup onChange={this.handleDeliveryChange} name="shipSpeed" defaultSelected="0">
                      <RadioButton style={{ marginBottom: 15 }} value="0" label={"My City only (" + this.state.city + ")"} />
                      <RadioButton style={{ marginBottom: 15 }} value="1" label="Some selected cities" />
                      <RadioButton style={{ marginBottom: 15 }} value="2" label="Anywhere" />
                    </RadioButtonGroup>
                    <p>Payment methods accepted</p>
                    {this.state.paymntErr ? (
                      <span className="errorPayment" style={{ color: "#e74c3c" }}>
                        Please select alteast 1 payment method
                      </span>
                    ) : null}
                    <Checkbox
                      onCheck={() => {
                        this.setState({ paymntErr: false });
                      }}
                      style={{ marginBottom: 15 }}
                      ref={el => (this.paytm = el)}
                      value="0"
                      label="Paytm"
                    />
                    <Checkbox
                      onCheck={() => {
                        this.setState({ paymntErr: false });
                      }}
                      style={{ marginBottom: 15 }}
                      ref={el => (this.bt = el)}
                      value="2"
                      label="Bank Transfer"
                    />
                    <Checkbox
                      onCheck={() => {
                        this.setState({ paymntErr: false });
                      }}
                      style={{ marginBottom: 15 }}
                      ref={el => (this.cod = el)}
                      value="1"
                      label="Cash on Delivery"
                    />
                    <Checkbox
                      onCheck={() => {
                        this.setState({ paymntErr: false });
                      }}
                      style={{ marginBottom: 15 }}
                      ref={el => (this.other = el)}
                      value="3"
                      label="All Other"
                    />
                    <RaisedButton onClick={this.handleNextStep3} primary={true} label="next" className="nextButton" />
                  </div>
                </div>
              </div>
            ) : null}
            {this.props.match.params.step === "final" ? (
              <div>
                <div className="formCardContainer">
                  <div className="formCard">
                    <div className="logoAndHeaderContainer">
                      <img className="logo" src={icon} alt="icon" />
                      <h2 className="RegisterHeading">Review your details</h2>
                      <h1 className="headerMain">Register</h1>
                      <span className="subHeader">Review your details and click on register button below</span>
                    </div>
                    <TextField floatingLabelText="Username" fullWidth value={this.state.username} />
                    <TextField floatingLabelText="Name" fullWidth value={this.state.fullname} />
                    <TextField floatingLabelText="Phone" fullWidth value={this.state.phone} />
                    <TextField floatingLabelText="Email" fullWidth value={this.state.email} />
                    <TextField floatingLabelText="Address Line 1" fullWidth value={this.state.address1} />
                    <TextField floatingLabelText="Address Line 2" fullWidth value={this.state.address2} />
                    <TextField floatingLabelText="City" fullWidth value={this.state.city} />
                    <TextField floatingLabelText="Pincode" fullWidth value={this.state.pincode} />
                    <TextField value={this.state.businessName.length > 0 ? this.state.businessName : "N/A"} fullWidth floatingLabelText="Business Name" />
                    <TextField multiLine={true} value={this.state.desc} spellCheck={false} type="text" className="TextField" fullWidth floatingLabelText="What are you selling" />
                    <p>Where do you want to sell your products</p>
                    <RadioButtonGroup
                      onChange={() => {
                        this.setState({
                          sellTo: this.state.sellTo
                        });
                      }}
                      name="shipSpeed"
                      valueSelected={this.state.sellTo.toString()}
                    >
                      <RadioButton style={{ marginBottom: 15 }} value="0" label={"My City only (" + this.state.city + ")"} />
                      <RadioButton style={{ marginBottom: 15 }} value="1" label="Some selected cities" />
                      <RadioButton style={{ marginBottom: 15 }} value="2" label="Anywhere" />
                    </RadioButtonGroup>
                    <div style={{ borderBottom: "1px solid #dedede", marginBottom: 15 }}>
                      <p>Payment methods accepted</p>
                      <Checkbox style={{ marginBottom: 15 }} checked={this.state.payments.indexOf("paytm") !== -1} value="0" label="Paytm" />
                      <Checkbox style={{ marginBottom: 15 }} checked={this.state.payments.indexOf("bt") !== -1} ref={el => (this.bt = el)} value="2" label="Bank Transfer" />
                      <Checkbox style={{ marginBottom: 15 }} checked={this.state.payments.indexOf("cod") !== -1} ref={el => (this.cod = el)} value="1" label="Cash on Delivery" />
                      <Checkbox style={{ marginBottom: 15 }} checked={this.state.payments.indexOf("other") !== -1} ref={el => (this.other = el)} value="3" label="All Other" />
                    </div>
                    <Checkbox style={{ marginBottom: 15 }} ref={el => (this.agreement = el)} label="Agree on terms and conditions" />
                    <RaisedButton onClick={this.register} primary={true} label="register" className="nextButton" />
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
