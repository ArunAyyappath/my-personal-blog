import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DefaultPage from "./defaultPage";
import CustomSignUp from "./signUp";
import SignIn from "./signIn";

class HomePage extends Component {
  componentDidMount() {
    document.title = "Arun Ayyappath Blog";
  }
  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route exact path="/" component={DefaultPage} />
            <Route exact path="/signIn" component={SignIn} />
            <Route exact path="/signUp" component={CustomSignUp} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default HomePage;
