import React, { Component } from "react";
import "../css/DefaultStyle.css";
import SummaryCardCollection from "./publishCardCompo";
import Logo from "../images/logoB.png";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Med from "../images/med.png";
import Pos from "../images/post.png";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    minHeight: 40,
    backgroundColor: "#fff",
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
              <Typography variant="h6" color="inherit">
                <img
                  src={Logo}
                  alt={"RD"}
                  style={{ width: "59px", padding: "3px 10px 3px 0" }}
                  title={"Reader Digest"}
                />
              </Typography>
              <span variant="h6" color="inherit" className={classes.align}>
                <a
                  href="/signIn"
                  key="signIn"
                  className={"sign"}
                  style={{ cursor: "pointer" }}
                >
                  sign in
                </a>
              </span>
            </>
          ) : (
            <>
              <div>
                <span className={"footer"}>
                  {" "}
                  © 2019 | Reader <span className={"spanR"}>D</span>igest
                </span>
              </div>
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
        <NavBarComponent signIn={true} />
        <div
          style={{
            width: "100%",
            height: "750px",
            margin: "13px 0",
            backgroundColor: "#f2f2f2"
          }}
        >
          <section>
            <div className={"marginCls"}>
              <h1 className={"h1Align"}>
                START YOUR <span className={"spanR"}>C</span>REATIVE WRITING
                TODAY
              </h1>
              <div style={{ textAlign: "center" }}>
                <label className={"borderAlign"} />
              </div>
              <div style={{ textAlign: "center", paddingTop: "40px" }}>
                <label className={"lableH"}>Enlarge your world</label>
                <label className={"BorderS"} />
                <label className={"lableH"}>Enhance your thoughts</label>
              </div>
            </div>
          </section>
        </div>

        <div
          style={{
            width: "100%",
            backgroundColor: "#f2f2f2",
            height: "750px",
            marginBottom: "13px"
          }}
        >
          <div className={"divaligner"}>
            <div style={{ textAlign: "center", paddingTop: "70px" }}>
              <h2 className={"lableSecH"}>
                Read<span> • </span>Write<span> • </span>Experience
              </h2>
              <img
                src={Med}
                alt={"screen"}
                style={{ width: "406px", height: "400px" }}
              />
            </div>
          </div>
          <div className={"divaligner"}>
            <div style={{ textAlign: "center", paddingTop: "70px" }}>
              <h2 className={"lableSecH"}>
                Make content <span className={"spanR"}>shareable</span>
              </h2>
              <img
                src={Pos}
                alt={"screen"}
                style={{ width: "502px", height: "400px" }}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            width: "100%",
            backgroundColor: "#000",
            height: "950px",
            overflow: "scroll"
          }}
        >
          <div style={{ textAlign: "center", color: "#fff", padding: "80px" }}>
            <h2 className={"lib"}>
              <span className={"spanR"}>L</span>ibrary
            </h2>
          </div>
          <SummaryCardCollection />
        </div>
        <NavBarComponent />
      </>
    );
  }
}

export default DefaultPage;
