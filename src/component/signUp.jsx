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
import "../css/signUp.css";
import firebase from "./fireStore";
import "firebase/app";
import "firebase/auth";
import ErrCompo from "./messageCompo";
import { UserProvider } from "../context/userVerification";
const userSetdataForVerification = {};

let emailVal;

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

function SignUp(props) {
  const classes = setTheStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.background}>
        <Avatar className={classes.ProfileP}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        <form className={classes.formStyle} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required={true}
                fullWidth
                id="userIdSignUp"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={props.onChangeof}
                value={props.userValChange}
                disabled={props.flag}
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
                id="passwordIdSignUp"
                autoComplete="current-password"
                onChange={props.onChangeof}
                value={props.passwordValChange}
                disabled={props.flag}
              />
            </Grid>
          </Grid>
        </form>
      </div>
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
        style={{ paddingTop: "25px" }}
      >
        {"Confessions of a Writing Freak"}
      </Typography>
    </Container>
  );
}

class CustomSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statusOf: false,
      statusInSignUp: false,
      natureOfErrInSignUp: "",
      messageInSignUp: "",
      emailVerificationStatus: false,
      userIdSignUp: "",
      passwordIdSignUp: "",
      inputStatus: false
    };
  }

  componentDidMount() {
    firebase.auth().signOut();
  }

  handleValueChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  onclickHandle = () => {
    emailVal = this.state.userIdSignUp;
    const passWordVal = this.state.passwordIdSignUp;

    if (emailVal !== "" && passWordVal !== "") {
      const auth = firebase.auth();
      const checkRelevance = auth.createUserWithEmailAndPassword(
        emailVal,
        passWordVal
      );
      checkRelevance.catch(e => this.hitErroPlacer(e));

      this.authListner();
    } else {
      this.setState({
        statusInSignUp: true,
        natureOfErrInSignUp: "warning",
        messageInSignUp: "Please fill all fields"
      });
      this.timerSign = setTimeout(this.fncChangeStatusSignUp, 5000);
    }
  };

  fncChangeStatusSignUp = () => {
    this.setState({
      statusInSignUp: false
    });
    clearTimeout(this.timerSign);
  };

  hitErroPlacer = e => {
    this.setState({
      statusInSignUp: true,
      natureOfErrInSignUp: "error",
      messageInSignUp: "" + e + ""
    });
    this.timerSign = setTimeout(this.fncChangeStatusSignUp, 5000);
  };

  sendEmailVerification = () => {
    let thisVal = this;
    let userIdValue = firebase.auth().currentUser;
    userIdValue
      .sendEmailVerification()
      .then(function() {
        thisVal.setState({
          statusInSignUp: true,
          natureOfErrInSignUp: "success",
          messageInSignUp: "Please verify the link send to your mail id",
          emailVerificationStatus: true
        });
      })
      .catch(function(error) {
        thisVal.setState({
          statusInSignUp: true,
          natureOfErrInSignUp: "error",
          messageInSignUp: "Some error occured",
          emailVerificationStatus: false
        });
      });
    this.timerSign = setTimeout(this.fncChangeStatusSignUp, 5000);
  };

  authListner = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
        //  console.log(user.emailVerified);
        if (user.emailVerified) {
          this.setState({ statusOf: true, emailVerificationStatus: true });
          localStorage.setItem("user", user.uid);
          userSetdataForVerification.email = emailVal;
        } else {
          this.sendEmailVerification();
        }
      } else {
        this.setState({ statusOf: false });
        localStorage.removeItem("user");
        userSetdataForVerification.email = null;
      }
    });
  };

  render() {
    return (
      <>
        {this.state.statusOf ? (
          <UserProvider value={userSetdataForVerification}>
            <BlogerData statusOfVal={this.state.statusOf} />
          </UserProvider>
        ) : (
          <>
            <SignUp
              userValChange={this.state.userIdSignUp}
              passwordValChange={this.state.passwordIdSignUp}
              onChangeof={this.handleValueChange}
              flag={this.state.inputStatus}
            />

            <Container component="main" maxWidth="xs">
              <button
                className="submit"
                type="submit"
                onClick={this.onclickHandle}
              >
                SignUp
              </button>
            </Container>

            <Container component="main" maxWidth="xs">
              <Typography
                variant="body2"
                color="textSecondary"
                align="left"
                style={{ float: "left" }}
              >
                <a href="/"> Home </a>
              </Typography>

              <Typography variant="body2" color="textSecondary" align="right">
                <a href="/signIn">Already have an account ? Sign In</a>
              </Typography>
            </Container>

            <ErrCompo
              statusVal={this.state.statusInSignUp}
              errorwarn={this.state.natureOfErrInSignUp}
              message={this.state.messageInSignUp}
            />
          </>
        )}
      </>
    );
  }
}

export default CustomSignUp;
