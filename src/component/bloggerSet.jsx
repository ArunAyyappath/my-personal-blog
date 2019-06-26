import React, { Component } from "react";
import "../css/bloggerSet.css";
import firebase from "../component/fireStore";
import Navbar from "./mainNavComponent";
import DefaultPage from "./defaultPage";

class BlogerData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signOutStatus: true
    };
  }
  handleSignOut = () => {
    firebase.auth().signOut();
    this.setState({ signOutStatus: false });
    localStorage.removeItem("lengthStored");
    document.location = "/";
  };
  render() {
    return (
      <>
        {this.props.statusOfVal ? (
          <>
            {this.state.signOutStatus ? (
              <>
                <Navbar
                  onClikLogout={this.handleSignOut}
                  statusChekButon={this.props.statusOfVal}
                />
              </>
            ) : (
              <DefaultPage />
            )}
          </>
        ) : null}
      </>
    );
  }
}

export default BlogerData;
