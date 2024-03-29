import React, { Component } from "react";

class ReadViewer extends Component {
  constructor(props) {
    super(props);

    this.bodyRef = React.createRef();
  }

  componentDidMount() {
    this.bodyRef.current.innerHTML = this.props.dataHandle.Data;
    //console.log(this.props, "this is from props");
  }
  render() {
    return (
      <>
        <div id="mainParent">
          <div style={{ textAlign: "left" }}>
            <button
              className={"btn btn m-2"}
              style={{ backgroundColor: "rgb(34, 131, 199)", color: "#fff" }}
              onClick={this.props.onBackClick}
            >
              Back
            </button>
          </div>
          <div
            style={{
              boxShadow:
                "0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)",
              backgroundColor: "white"
            }}
          >
            <div style={{ textAlign: "center", padding: "30px" }}>
              <h3>{this.props.dataHandle.TitleVal}</h3>
            </div>
            <div
              style={{
                textAlign: "left",
                padding: "30px",
                wordBreak: "break-word",
                height: "auto",
                overflowX: "scroll",
                fontSize: "22px"
              }}
            >
              <div ref={this.bodyRef} />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ReadViewer;
