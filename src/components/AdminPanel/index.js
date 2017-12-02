import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Dashboard from "./Dashboard";
import { post } from "../../libs/ajax";

class AdminPanel extends Component {
  state = {
    users: []
  };
  componentDidMount() {
    this.loadUser();
  }
  loadUser = () => {
    post("load_users", {}, res => {
      this.setState({
        users: res
      });
    });
  };
  render() {
    const { param } = this.props.match.params;
    switch (param) {
      case "dashboard":
        return <Dashboard {...this.state} />;
      default:
        return <Dashboard />;
    }
  }
}

export default withRouter(AdminPanel);
