import React, { Component } from "react";
import Register from "../components/Register";
import { BrowserRouter, Route } from "react-router-dom";
class Routes extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Register} />
            <Route exact path="/register" component={Register} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default Routes;
