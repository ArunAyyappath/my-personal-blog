import React, { Component } from "react";
import firebase from "./fireStore";
import "@firebase/firestore";
import "firebase/firebase-database";
import ErrCompo from "./messageCompo";
import Preloader from "./preloader";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";

class SaveChangeButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      saveDataToDb: false,
      statusInSave: false,
      natureOfErrInSave: "",
      messageInSave: "",
      preloader: false
    };
  }

  handleUpdation = () => {
    let Timeperiod = new Date();
    let monthChanger = Timeperiod.toString().split(" ")[1];
    //console.log(postData);localStorage.getItem("user") + "/" + parseFloat(this.props.pathGainer)
    // Math.random() * 20
    return firebase
      .database()
      .ref()
      .child(localStorage.getItem("user") + "/A" + this.props.pathGainer)
      .update({
        Data: this.props.saveData,
        TitleVal: this.props.titledata,
        ImgUrl: this.props.backImg,
        dataCreatedOn:
          Timeperiod.getDate() +
          "/" +
          monthChanger +
          "/" +
          Timeperiod.getFullYear(),
        dataTarget: this.props.pathGainer
      })
      .then(this.handleErorUpdate());
  };

  handleErorUpdate = error => {
    this.props.cancelTheSelected();
  };
  render() {
    return (
      <>
        <div style={{ textAlign: "right", padding: "90px 30px" }}>
          {this.props.chekCancelStatus ? (
            <>
              <Button
                onClick={this.getUpdatedWithProps}
                variant="contained"
                size="medium"
                style={{
                  margin: "5px",
                  backgroundColor: "#2283c7",
                  color: "#fff"
                }}
              >
                <SaveIcon />
                Save
              </Button>
              <div
                style={{ position: "relative", left: "61px", bottom: "55px" }}
              >
                {this.state.preloader ? <Preloader /> : null}
              </div>
            </>
          ) : (
            <>
              <Button
                onClick={this.handleUpdation}
                variant="contained"
                size="medium"
                style={{
                  margin: "5px",
                  backgroundColor: "#2283c7",
                  color: "#fff"
                }}
              >
                <SaveIcon />
                Save
              </Button>

              <Button
                onClick={this.props.cancelTheSelected}
                variant="contained"
                size="medium"
                style={{
                  margin: "5px",
                  backgroundColor: "#2283c7",
                  color: "#fff"
                }}
              >
                Cancel
              </Button>
            </>
          )}

          {this.state.saveDataToDb ? (
            <ErrCompo
              statusVal={this.state.statusInSave}
              errorwarn={this.state.natureOfErrInSave}
              message={this.state.messageInSave}
            />
          ) : null}
        </div>
      </>
    );
  }

  fncChangeStatusSave = () => {
    // alert("called");
    this.setState({
      statusInSave: false,
      saveDataToDb: false,
      natureOfErrInSave: "",
      messageInSave: "",
      preloader: false
    });
    clearInterval(this.timerSave);
  };

  getUpdatedWithProps = () => {
    let selector = this;
    this.setState({ preloader: true });
    let GenerateRandom = (Math.random() * 1e32).toString(36);
    if (this.props.titledata === "" || this.props.backImg === "") {
      this.setState({
        preloader: true,
        statusInSave: true,
        saveDataToDb: true,
        natureOfErrInSave: "error",
        messageInSave: "please fill Title & Upload Image"
      });
      this.timerSave = setTimeout(this.fncChangeStatusSave, 5000);
    } else {
      let timeDecider = new Date();
      let Month = timeDecider.toString().split(" ")[1];
      firebase
        .database()
        .ref()
        .child(localStorage.getItem("user") + "/A" + GenerateRandom)
        .set(
          {
            Data: this.props.saveData,
            TitleVal: this.props.titledata,
            ImgUrl: this.props.backImg,
            dataCreatedOn:
              timeDecider.getDate() +
              "/" +
              Month +
              "/" +
              timeDecider.getFullYear(),

            dataTarget: GenerateRandom,
            published: false,
            PublisheddataTarget: "",
            disableStatus: true
          },

          function(error) {
            if (error) {
              selector.setState({
                statusInSave: true,
                saveDataToDb: true,
                natureOfErrInSave: "error",
                messageInSave: "some error occured"
              });
              selector.timerSave = setTimeout(
                selector.fncChangeStatusSave,
                3000
              );

              console.log(error);
            } else {
              selector.setState({
                statusInSave: true,
                saveDataToDb: true,
                natureOfErrInSave: "success",
                messageInSave: "successfully saved",
                preloader: false
              });
              selector.timerSave = setTimeout(
                selector.fncChangeStatusSave,
                3000
              );
            }
          }
        );
    }
  };
}

export default SaveChangeButton;
