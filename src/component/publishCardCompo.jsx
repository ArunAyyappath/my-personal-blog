import React, { Component } from "react";
import firebase from "./fireStore";
import "@firebase/firestore";
import "firebase/firebase-database";
import SummaryCardCompo from "./summaryCard";
import ReadViewer from "./readerView";
import img from "../images/blog1N.jpg";
let changeHandlerData = [];
let DataDerivedOut = [];

class SummaryCardCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      readCheck: true,
      readerValue: []
    };
  }
  componentDidMount() {
    let checkedVal = this;
    return firebase
      .database()
      .ref()
      .child("NMt5236TUAHSYhsvdghadhhHAYGSDPUBLISHED")
      .on(
        "value",
        function(snapshot) {
          changeHandlerData = [];
          if (snapshot.val() !== null) {
            snapshot.forEach(function(childSnapshot) {
              // console.log(childSnapshot.val());
              var item = childSnapshot.val();
              console.log(item);
              item.key = (Math.random() * 1e32).toString(36);

              changeHandlerData.push(item);
            });

            checkedVal.setState({ isLoaded: true });
          }
          // console.log(changeHandlerData);
        },
        function(error) {
          if (error) {
            console.log(error);
          }
        }
      );
  }
  onBackClick = () => {
    this.setState({ readerValue: [], readCheck: true });
  };

  onReadClick = event => {
    DataDerivedOut = [];

    console.log(event.currentTarget);

    let pathCrossChecker = event.currentTarget.attributes[1].value;

    function filterDataChek(dataFilterChek) {
      return dataFilterChek.PublisheddataTarget === pathCrossChecker;
    }

    DataDerivedOut = changeHandlerData.filter(filterDataChek);

    let changedArray = [
      {
        Data: DataDerivedOut[0].PublishedData,
        ImgUrl: DataDerivedOut[0].PublishedImgUrl,
        TitleVal: DataDerivedOut[0].PublishedTitleVal,
        dataCreatedOn: DataDerivedOut[0].PublisheddataCreatedOn,
        dataTarget: DataDerivedOut[0].PublisheddataTarget,
        published: DataDerivedOut[0].Publishedpublished,
        dataSavedTarget: DataDerivedOut[0].dataSavedTarget,
        key: DataDerivedOut[0].key
      }
    ];

    this.setState({ readerValue: changedArray[0], readCheck: false });
  };
  render() {
    return (
      <>
        {this.state.readCheck ? (
          <>
            {this.state.isLoaded ? (
              <>
                {changeHandlerData.map(cardData => (
                  <SummaryCardCompo
                    key={cardData.PublisheddataTarget}
                    titleHead={cardData.PublishedTitleVal}
                    publishedId={cardData.PublisheddataTarget}
                    dataInner={cardData.PublishedData}
                    imagePath={cardData.PublishedImgUrl}
                    onClickRead={this.onReadClick}
                  />
                ))}
              </>
            ) : (
              <SummaryCardCompo
                key={Date.now()}
                titleHead={"Reader"}
                dataInner={"<p>Loading</p>"}
                imagePath={img}
              />
            )}
          </>
        ) : null}

        {!this.state.readCheck ? (
          <ReadViewer
            onBackClick={this.onBackClick}
            key={this.state.readerValue.dataCreatedOn}
            dataHandle={this.state.readerValue}
          />
        ) : null}
      </>
    );
  }
}

export default SummaryCardCollection;
