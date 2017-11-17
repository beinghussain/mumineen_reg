import React, { Component } from "react";
import Register from "../components/Register";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
class Routes extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Register} />
            <Route exact path="/register" component={() => <Redirect to="/register/1" />} />
            <Route exact path="/register/:step" component={Register} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default Routes;
