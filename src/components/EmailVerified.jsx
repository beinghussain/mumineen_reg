import React, { Component } from "react";
import icon from "../assets/mumineenshopicon.svg";

class EmailVerified extends Component {
  render() {
    return (
      <div className="formCardContainer">
        {this.props.match.params.type === "success" ? (
          <div className="formCard">
            <div className="logoAndHeaderContainer" style={{ background: "#fff" }}>
              <img className="logo" src={icon} alt="icon" />
              <h2 className="RegisterHeading">Success!</h2>
              <h1 className="headerMain">Email Verified</h1>
              <span className="subHeader">Your email has been successfully verified</span>
            </div>
          </div>
        ) : null}
        {this.props.match.params.type === "failed" ? (
          <div className="formCard">
            <div className="logoAndHeaderContainer" style={{ background: "#fff" }}>
              <img className="logo" src={icon} alt="icon" />
              <h2 className="RegisterHeading">Failed!</h2>
              <h1 className="headerMain">Verification Failed</h1>
              <span className="subHeader">Your email has been not verified</span>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default EmailVerified;
