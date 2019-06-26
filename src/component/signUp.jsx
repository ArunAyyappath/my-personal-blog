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
    backgroundColor: theme.palette.secondary.main
  },
  formStyle: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function SignUp() {
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
                id="email"
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
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
        </form>
      </div>
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
      emailVerificationStatus: false
    };
  }

  componentDidMount() {
    firebase.auth().signOut();
  }

  onclickHandle = () => {
    emailVal = document.getElementById("email").value;
    const passWordVal = document.getElementById("password").value;

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
    clearInterval(this.timerSign);
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
            <SignUp />

            <div style={{ textAlign: "center" }}>
              <button
                className="submit m-4"
                type="submit"
                onClick={this.onclickHandle}
              >
                SignUp
              </button>
            </div>
            <div className="home">
              <a href="/">Home</a>
            </div>
            <div className="accOn">
              <a href="/signIn">Already have an account ? signin</a>
            </div>

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
