import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import DeleteIcon from "@material-ui/icons/Delete";
import firebase from "./fireStore";
import "@firebase/firestore";
import "firebase/firebase-database";
import img from "../images/blog2N.jpg";
import Preloader from "./preloader";
import ReadViewer from "./readerView";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import PublishCompo from "./publishComponent";
import AssignmentIcon from "@material-ui/icons/Assignment";
import "../css/blogcontent.css";
import Chip from "@material-ui/core/Chip";

let changeHandler = [];
let DataDerived = [];

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: "363px",
    minWidth: "363px",
    maxHeight: "420px",
    minHeight: "420px"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

function RecipeReviewCard(props) {
  function onChekUpdateDelete(event) {
    let targetDecider = event.currentTarget.getAttribute("aria-label");

    switch (targetDecider) {
      case "Update": {
        props.onHandlePage(props.dataIdentifier, changeHandler);
        break;
      }
      case "Delete": {
        props.doDeleteIt(props.dataIdentifier);
        break;
      }
      default: {
        console.log("defaultcase");
      }
    }
  }

  const classes = useStyles();

  return (
    <div style={{ float: "left", margin: "50px 40px 10px 60px" }}>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {props.titleFormater.split("")[0].toUpperCase()}
            </Avatar>
          }
          action={
            props.publish ? (
              <PublishCompo dataContained={props.dataExchange} />
            ) : null
          }
          title={props.titleFormater}
          subheader={props.dataSetOn}
        />
        <CardMedia
          className={classes.media}
          image={props.ImgSrc}
          alt={props.titleFormater}
          title={props.titleFormater}
        />
        <CardContent>
          <div style={{ overflow: "hidden", height: "20px", width: "313px" }}>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.dataInner
                .replace(/<\s*br[^>]?>/, "\n")
                .replace(/(<([^>]+)>)/g, "")
                .replace(/nbsp;/g, "")}
            </Typography>
          </div>
        </CardContent>

        {props.setAddOn ? (
          <>
            <CardActions disableSpacing>
              <Fab
                onClick={props.readerCompo}
                aria-label={props.dataIdentifier}
                style={{
                  marginRight: "12px",
                  color: "#fff",
                  backgroundColor: "#2283c7",
                  cursor: "pointer !important"
                }}
              >
                <span>
                  <AssignmentIcon />
                </span>
              </Fab>

              {props.dataExchange.disableStatus ? (
                <>
                  <Fab
                    onClick={onChekUpdateDelete}
                    aria-label="Update"
                    style={{
                      marginRight: "12px",
                      color: "#fff",
                      backgroundColor: "#2283c7",
                      cursor: "pointer !important"
                    }}
                  >
                    <span>
                      <EditIcon />
                    </span>
                  </Fab>
                  <Fab
                    aria-label="Delete"
                    onClick={onChekUpdateDelete}
                    style={{
                      marginRight: "12px",
                      color: "#fff",
                      backgroundColor: "#2283c7",
                      cursor: "pointer !important"
                    }}
                  >
                    <DeleteIcon className={"hello"} />
                  </Fab>
                </>
              ) : (
                <>
                  <Fab
                    aria-label="Update"
                    style={{
                      marginRight: "12px",
                      color: "#fff",
                      backgroundColor: "rgba(34, 131, 199, 0.56)",
                      cursor: "pointer !important"
                    }}
                  >
                    <span>
                      <EditIcon />
                    </span>
                  </Fab>
                  <Fab
                    aria-label="Delete"
                    style={{
                      marginRight: "12px",
                      color: "#fff",
                      backgroundColor: "rgba(34, 131, 199, 0.56)",
                      cursor: "pointer !important"
                    }}
                  >
                    <DeleteIcon className={"hello"} />
                  </Fab>
                  <div>
                    <Chip
                      size="medium"
                      label="Published"
                      clickable
                      color="primary"
                      style={{
                        left: "23px",
                        bottom: "309px",
                        position: "relative"
                      }}
                    />
                  </div>
                </>
              )}
            </CardActions>
          </>
        ) : null}
      </Card>
    </div>
  );
}

class ContentDecider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backendData: "",
      stateChek: false,
      loader: true,
      addOnMenu: false,
      updateStatewith: 0,
      renderUpdatePage: false,
      readHandler: true, // will not render in true
      readerState: []
    };
  }
  componentDidMount() {
    let dataAlong = this;
    const userId = firebase.auth().currentUser.uid;
    return firebase
      .database()
      .ref()
      .child(userId)
      .on(
        "value",
        function(snapshot) {
          changeHandler = [];
          if (snapshot.val() !== null) {
            snapshot.forEach(function(childSnapshot) {
              // console.log(childSnapshot.val());
              var item = childSnapshot.val();
              item.key = (Math.random() * 1e32).toString(36);
              changeHandler.push(item);
            });

            dataAlong.setState({
              backendData: changeHandler,
              stateChek: true,
              loader: false,
              addOnMenu: true
            });
            //localStorage.setItem("lengthStored", blogData.length);
          } else {
            dataAlong.setState({
              backendData: "",
              stateChek: false,
              loader: false,
              addOnMenu: false
            });
            //localStorage.setItem("lengthStored", 0);
          }
        },
        function(error) {
          if (error) {
            console.log(error);
          }
        }
      );
  }

  readerCompo = event => {
    DataDerived = [];
    let pathCrossChecker = event.currentTarget.attributes[3].value;

    function filterData(dataFilterChek) {
      return dataFilterChek.dataTarget === pathCrossChecker;
    }
    DataDerived = changeHandler.filter(filterData);

    this.setState({ readerState: DataDerived[0], readHandler: false });
    // console.log(this.state.readerState);
  };

  onClose = () => {
    this.setState({ readerState: [], readHandler: true });
  };

  render() {
    return (
      <div style={{ width: "100%" }}>
        {this.state.readHandler ? (
          <>
            {this.state.stateChek ? (
              changeHandler.map(data => (
                <RecipeReviewCard
                  key={Date.now() + data.dataTarget}
                  readerCompo={this.readerCompo}
                  dataIdentifier={data.dataTarget}
                  doDeleteIt={this.props.doDeleteStepsHandler}
                  onHandlePage={this.props.changeTarget}
                  setAddOn={this.state.addOnMenu}
                  dataSetOn={data.dataCreatedOn}
                  dataInner={data.Data}
                  dataExchange={data}
                  ImgSrc={data.ImgUrl}
                  publish={true}
                  titleFormater={data.TitleVal}
                />
              ))
            ) : (
              <RecipeReviewCard
                dataIdentifier={0}
                setAddOn={this.state.addOnMenu}
                dataInner={""}
                ImgSrc={img}
                publish={false}
                titleFormater={"Your Library Is Empty"}
              />
            )}
          </>
        ) : null}

        {!this.state.readHandler
          ? DataDerived.map(reader => (
              <ReadViewer
                onBackClick={this.onClose}
                key={this.state.readerState.dataCreatedOn}
                dataHandle={this.state.readerState}
              />
            ))
          : null}

        {this.state.loader ? (
          <div style={{ position: "absolute", right: "1012px", top: "475px" }}>
            <Preloader />
          </div>
        ) : null}
      </div>
    );
  }
}

export default ContentDecider;
