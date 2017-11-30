import React, { Component } from "react";
import "./styles/global.css";
import { MuiThemeProvider, getMuiTheme } from "material-ui/styles";
import { Route, BrowserRouter, Redirect } from "react-router-dom";
import Register from "./components/Register";
import AdminPanel from "./components/AdminPanel";
import EmailVerified from "./components/EmailVerified";
import Header from "./components/Header";

const muiTheme = getMuiTheme({
  palette: {
    textColor: "#2C3E50",
    primary1Color: "#1ABC9C"
  }
});

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <div>
              <Header />
            </div>
            <div>
              <Route exact path="/admin/" component={() => <Redirect to="/admin/dashboard" />} />
              <Route exact path="/admin/:param" component={() => <AdminPanel />} />
              <Route exact path="/" component={() => <Redirect to="/register/1" />} />
              <Route exact path="/email/:type" component={EmailVerified} />
              <Route exact path="/register" component={() => <Redirect to="/register/1" />} />
              <Route exact path="/register/:step" component={Register} />
            </div>
          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

export default App;
