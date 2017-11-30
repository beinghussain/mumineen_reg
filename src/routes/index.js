import React, { Component } from "react";
import Register from "../components/Register";
import { Route, Redirect } from "react-router-dom";
import EmailVerified from "../components/EmailVerified";
import Home from "../components/Home";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { adminPanel } from "../reducers";
import AdminPanel from "../components/Home";
import checkAuth from "../libs/authenticate";

let adminStore = createStore(adminPanel);

class Routes extends Component {
  componentDidMount() {
    let authentication = checkAuth();
  }

  render() {
    return (
      <div>
        <div>
          <Route
            exact
            path="/admin"
            component={() => (
              <Provider store={adminStore}>
                <AdminPanel />
              </Provider>
            )}
          />
          <Route exact path="/" component={() => <Home />} />
          <Route exact path="/email/:type" component={EmailVerified} />
          <Route exact path="/register" component={() => <Redirect to="/register/1" />} />
          <Route exact path="/register/:step" component={Register} />
        </div>
      </div>
    );
  }
}

export default Routes;
