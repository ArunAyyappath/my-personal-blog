import React, { Component } from "react";
import "../css/DefaultStyle.css";
import SummaryCardCollection from "./publishCardCompo";
import Logo from "../images/logoB.png";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import inst from "../images/instagram.jpg";
import git from "../images/github.jpg";
import twt from "../images/twitter.jpg";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    minHeight: 40,
    backgroundColor: "#f2f2f2",
    color: "#000"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  align: {
    float: "right",
    position: "absolute",
    right: "40px"
  }
}));

function NavBarComponent(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense" className={classes.root}>
          {props.signIn ? (
            <>
              <Container maxWidth="xl">
                <Typography variant="h6" color="inherit" align="right">
                  <button className={"signContainer"}>
                    <a href="/signIn" className={"signInner"}>
                      sign in
                    </a>
                  </button>
                </Typography>
              </Container>
            </>
          ) : (
            <>
              <Container maxWidth="xl">
                <Typography variant="h6" color="inherit" align="right">
                  <div className={"outer"}>
                    <a href="https://github.com/ArunAyyappath">
                      <img src={git} className={"imgSet"} alt={"github"} />
                    </a>
                    |
                    <a href="https://www.instagram.com/arun_ayyappath/">
                      <img src={inst} className={"imgSet"} alt={"instagram"} />
                    </a>
                    |
                    <a href="https://twitter.com/arunayyappath">
                      <img src={twt} className={"imgSet"} alt={"twitter"} />
                    </a>
                  </div>
                </Typography>
              </Container>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

class DefaultPage extends Component {
  //   <button className="btnDefault hvr-radial-in">
  //   <a href="/signIn" key="signIn" style={{ color: "#fff" }}>
  //     Sign In
  //   </a>
  // </button>

  render() {
    return (
      <>
        <Typography component="div" style={{ height: "96vh" }}>
          <NavBarComponent signIn={true} />

          <Container
            component="main"
            maxWidth="xl"
            style={{
              backgroundColor: "#fff",
              overflow: "scroll",
              height: "90vh",
              marginBottom: "5px",
              paddingBottom: "14px"
            }}
          >
            <SummaryCardCollection />
          </Container>
        </Typography>
        <NavBarComponent />
      </>
    );
  }
}

export default DefaultPage;
