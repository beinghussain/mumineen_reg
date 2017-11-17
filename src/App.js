import React, { Component } from "react";
import "./global.css";
import { MuiThemeProvider, getMuiTheme } from "material-ui/styles";
import Routes from "./routes";

const muiTheme = getMuiTheme({
  palette: {
    textColor: "#2C3E50",
    primary1Color: "#1ABC9C"
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Routes />
      </MuiThemeProvider>
    );
  }
}

export default App;
