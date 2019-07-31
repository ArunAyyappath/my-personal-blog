import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import inst from "../images/instagram.jpg";
import git from "../images/github.jpg";
import twt from "../images/twitter.jpg";
import Container from "@material-ui/core/Container";
import "../css/detailViewer.css";

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
                <Typography variant="h6" color="inherit" align="left">
                  <button className={"signContainer"}>
                    <a href="/" className={"signInner"}>
                      Blog
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

class DetailViewer extends Component {
  state = {};
  render() {
    return (
      <>
        <Typography component="div" style={{ height: "96vh" }}>
          <NavBarComponent signIn={true} />

          <Container
            component="main"
            maxWidth="md"
            style={{
              backgroundColor: "#fff",
              overflow: "scroll",
              height: "90vh",
              marginBottom: "5px",
              paddingBottom: "14px",
              marginTop: "40px"
            }}
          >
            <Typography
              className={"header"}
              variant="h3"
              color="inherit"
              align="center"
            >
              About
            </Typography>
            <Typography
              className={"footer"}
              variant="body2"
              color="inherit"
              align="left"
            >
              I'm a Software Engineer by profession, this is my personal blog.I
              write about technology, coding and I like to travel across the
              world. I started my professional career at
              <a href="https://appscook.com/"> Appscook Technologies</a>. A day
              dreamer, optimistic. I write here so that I can make notes, share,
              discuss the things I find interesting in life.
            </Typography>
            <Typography
              className={"footer"}
              style={{ marginTop: "15px" }}
              variant="body2"
              color="inherit"
              align="left"
            >
              If you want to say hi, mail me at arunayyappath(@)gmail.com
            </Typography>
          </Container>
        </Typography>
        <NavBarComponent />
      </>
    );
  }
}

export default DetailViewer;
