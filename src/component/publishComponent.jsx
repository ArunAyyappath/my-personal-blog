import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import firebase from "./fireStore";
import "@firebase/firestore";
import "firebase/firebase-database";

const ITEM_HEIGHT = 30;

function LongMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [publishedStatus, SetPub] = React.useState(false);
  const open = Boolean(anchorEl);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
    SetPub(props.dataValue.published);
  }

  function handleClose(event) {
    setAnchorEl(null);

    switch (event.target.innerText) {
      case "Publish": {
        // console.log("published");
        handlePublishChange(props.dataValue);
        break;
      }
      case "Unpublish": {
        deleteCompoPublish(props.dataValue);
        break;
      }
      default: {
        console.log("default case");
      }
    }
  }
  function hitFirebase(dataTransf, pathId) {
    return firebase
      .database()
      .ref()
      .child(localStorage.getItem("user") + "/A" + dataTransf.dataTarget)
      .update({
        published: !dataTransf.published,
        PublisheddataTarget: pathId,
        disableStatus: !dataTransf.disableStatus
      });
  }

  function handlePublishChange(dataDerived) {
    let GenerateRandomNum = (Math.random() * 1e32).toString(36);
    let pathSelection = "P" + GenerateRandomNum;
    firebase
      .database()
      .ref()
      .child("NMt5236TUAHSYhsvdghadhhHAYGSDPUBLISHED")
      .child(pathSelection)
      .set({
        PublishedData: dataDerived.Data,
        PublishedTitleVal: dataDerived.TitleVal,
        PublishedImgUrl: dataDerived.ImgUrl,
        PublisheddataCreatedOn: dataDerived.dataCreatedOn,
        dataSavedTarget: dataDerived.dataTarget,
        PublisheddataTarget: pathSelection,
        Publishedpublished: true
      });

    return hitFirebase(dataDerived, pathSelection);
  }

  function deleteCompoPublish(deleteDataTarget) {
    firebase
      .database()
      .ref()
      .child("NMt5236TUAHSYhsvdghadhhHAYGSDPUBLISHED")
      .child(deleteDataTarget.PublisheddataTarget)
      .remove();

    return hitFirebase(deleteDataTarget, "");
  }

  return (
    <div>
      <IconButton
        aria-label="More"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200
          }
        }}
      >
        {publishedStatus ? (
          <MenuItem key={"unpublish"} onClick={handleClose}>
            {"Unpublish"}
          </MenuItem>
        ) : (
          <MenuItem key={"Publish"} onClick={handleClose}>
            {"Publish"}
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
class PublishCompo extends Component {
  render() {
    return (
      <>
        <LongMenu dataValue={this.props.dataContained} />
      </>
    );
  }
}

export default PublishCompo;
