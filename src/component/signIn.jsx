import React from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import BlogerData from "./bloggerSet";
import "../css/signin.css";
import firebase from "./fireStore";
import "firebase/app";
import "firebase/auth";
import ErrCompo from "./messageCompo";
import { UserProvider } from "../context/userVerification";
const userSetdataForVerificationSignIn = {};

let emailValE;

function Footer() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Confessions of a Writing Freak"}
    </Typography>
  );
}
const setTheStyles = makeStyles(theme => ({
  background: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  ProfileP: {
    margin: theme.spacing(1),
    backgroundColor: "#4c6aff"
  },
  formStyle: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function SignIn() {
  const classes = setTheStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.background}>
        <Avatar className={classes.ProfileP}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>

        <form className={classes.formStyle} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required={true}
                fullWidth
                id="emailVal"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required={true}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="passwordVal"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
        </form>
      </div>
      <Footer />
    </Container>
  );
}

class CustomSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statusOfI: false, // change to false
      statusSignin: false,
      statusVal: "",
      messageInSignin: "",
      emailVerificationStatus: false,
      passErr: false
    };
  }

  componentDidMount() {
    firebase.auth().signOut();
  }

  onclickHandleChange = () => {
    emailValE = document.getElementById("emailVal").value;
    const passWordValE = document.getElementById("passwordVal").value;
    userSetdataForVerificationSignIn.email = emailValE;

    if (emailValE !== "" && passWordValE !== "") {
      const authFire = firebase.auth();
      const checkRelevanceAuth = authFire.signInWithEmailAndPassword(
        emailValE,
        passWordValE
      );
      checkRelevanceAuth.catch(e => this.hitErrHandler(e));
      this.authListnerChange();
    } else {
      this.setState({
        statusSignin: true,
        natureOfErr: "warning",
        messageInSignin: "Please fill all fields"
      });
      this.timer = setTimeout(this.fncChangeStatus, 5000);
    }
  };

  hitErrHandler = e => {
    this.setState({
      statusSignin: true,
      natureOfErr: "error",
      messageInSignin: "" + e + "",
      passErr: true
    });
    this.timer = setTimeout(this.fncChangeStatus, 5000);
  };

  fncChangeStatus = () => {
    this.setState({
      statusSignin: false
    });
    clearInterval(this.timer);
  };

  authListnerChange = () => {
    firebase.auth().onAuthStateChanged(user => {
      // console.log(user);
      if (user !== null) {
        if (user.emailVerified) {
          this.setState({ statusOfI: true });
          localStorage.setItem("user", user.uid);
          userSetdataForVerificationSignIn.email = emailValE;
          //console.log(user);
          this.forceUpdate();
        } else {
          this.sendEmailVerification();
        }
      } else {
        this.setState({ statusOfI: false });
        localStorage.removeItem("user");
        userSetdataForVerificationSignIn.email = null;
      }
    });
  };

  hitForgotPass = () => {
    let thisSet = this;
    let auth = firebase.auth();
    let emailAddress = document.getElementById("emailVal").value;
    auth
      .sendPasswordResetEmail(emailAddress)
      .then(function() {
        thisSet.setState({
          statusSignin: true,
          natureOfErr: "success",
          messageInSignin: "successfully send password reset mail"
        });
        // Email sent.
      })
      .catch(function(error) {
        thisSet.setState({
          statusSignin: true,
          natureOfErr: "error",
          messageInSignin: error
        });

        // An error happened.
      });

    thisSet.timer = setTimeout(this.fncChangeStatus, 5000);
  };

  sendEmailVerification = () => {
    let thisVal = this;
    let userIdValue = firebase.auth().currentUser;
    userIdValue
      .sendEmailVerification()
      .then(function() {
        thisVal.setState({
          statusSignin: true,
          natureOfErr: "success",
          messageInSignin: "Please verify the link send to your mail id",
          emailVerificationStatus: true
        });
      })
      .catch(function(error) {
        thisVal.setState({
          statusSignin: true,
          natureOfErr: "error",
          messageInSignin: "Some error occured",
          emailVerificationStatus: false
        });
      });
    this.timer = setTimeout(this.fncChangeStatus, 5000);
  };

  render() {
    return (
      <>
        {this.state.statusOfI ? (
          <UserProvider value={userSetdataForVerificationSignIn}>
            <BlogerData statusOfVal={this.state.statusOfI} />
          </UserProvider>
        ) : (
          <>
            <SignIn />
            <>
              <div style={{ textAlign: "center" }}>
                <button
                  className="submitT m-4"
                  type="submit"
                  onClick={this.onclickHandleChange}
                >
                  SignIn
                </button>
              </div>
              {this.state.passErr ? (
                <div
                  className="homeSign"
                  style={{ width: "45%", textAlign: "right", float: "left" }}
                >
                  <p
                    onClick={this.hitForgotPass}
                    style={{ color: "#2188ff", cursor: "pointer" }}
                  >
                    Forgot password
                  </p>
                </div>
              ) : (
                <div className="homeSign">
                  <a href="/">Home</a>
                </div>
              )}

              <div className="accOnSignUp">
                <a href="/signUp">Don't have an account? Sign Up</a>
              </div>
            </>

            <ErrCompo
              statusVal={this.state.statusSignin}
              errorwarn={this.state.natureOfErr}
              message={this.state.messageInSignin}
            />
          </>
        )}
      </>
    );
  }
}

export default CustomSignUp;
