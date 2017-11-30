import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Dashboard from "./Dashboard";

class AdminPanel extends Component {
  render() {
    const { param } = this.props.match.params;
    switch (param) {
      case "dashboard":
        return <Dashboard />;
        break;
      default:
    }
  }
}

export default withRouter(AdminPanel);
