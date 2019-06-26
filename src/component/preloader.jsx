import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2)
  }
}));

function CircularIndeterminate(props) {
  const classes = useStyles();

  return (
    <div>
      <CircularProgress className={classes.progress} color="secondary" />
    </div>
  );
}

class Preloader extends Component {
  state = {};
  render() {
    return <CircularIndeterminate />;
  }
}

export default Preloader;
