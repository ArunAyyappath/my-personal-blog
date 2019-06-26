import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/lib/toolbar";
import "../css/editor.css";
import SaveChangeButton from "./saveChanges";
import "@firebase/firestore";
import "firebase/firebase-database";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

var ImgUrlSave = "";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  dense: {
    marginTop: 19
  }
}));

function TextFields(props) {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="blogTitle"
        label="Title"
        margin="dense"
        onChange={props.onChangeEvent}
        value={props.valueTarget}
      />
    </form>
  );
}

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorHtml: "",
      contentEdited: false,
      valueOftitle: "",
      ImgUrl: "",
      cancelStatus: false
    };
    this.ImgRef = React.createRef();
  }

  componentDidMount() {
    let propDataHandler = this.props.dataInnerComponent;
    //alert("calling datainnerComponent");
    // console.log(this.props);
    if (
      propDataHandler !== "" &&
      propDataHandler !== undefined &&
      propDataHandler !== null &&
      propDataHandler !== "undefined"
    ) {
      let pathCloner = this.props.pathSelector;
      function filterData(dataFilter) {
        return dataFilter.dataTarget === pathCloner;
      }
      let DataDerived = propDataHandler.filter(filterData);
      console.log(DataDerived);
      this.setState({
        editorHtml: DataDerived[0].Data,
        valueOftitle: DataDerived[0].TitleVal,
        cancelStatus: true
      });
      ImgUrlSave = DataDerived[0].ImgUrl;

      this.forceUpdate();
    }
  }
  componentWillUnmount() {
    ImgUrlSave = "";
  }

  handleChange = html => {
    this.setState({ editorHtml: html });
    if (html !== "<p><br></p>") {
      this.setState({ contentEdited: true });
    } else {
      this.setState({ contentEdited: false });
    }
  };

  handleChangeOfImg = event => {
    var file = document.querySelector("input[type=file]").files[0];
    var reader = new FileReader();

    reader.addEventListener(
      "load",
      function() {
        ImgUrlSave = reader.result; // result converted to base 64
        clearInterval(this.setUpdater);
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
    this.setUpdater = setTimeout(() => {
      this.forceUpdate();
      // alert(ImgUrlSave);
    }, 500);
  };

  handleChangeOfBoth = event => {
    this.setState({ valueOftitle: event.currentTarget.value });
  };

  render() {
    const stylesUpdates = this.props.stylesChanger;
    return (
      <>
        {this.props.statusButon ? (
          <>
            <div style={{ width: "35%", float: "left", marginLeft: "118px" }}>
              <TextFields
                onChangeEvent={this.handleChangeOfBoth}
                valueTarget={this.state.valueOftitle}
              />
            </div>
            <div style={{ width: "50%", float: "left" }}>
              <span style={{ margin: "20px", fontWeight: "bold" }}>
                Select Image
              </span>
              :{" "}
              <input
                type="file"
                name="myFile"
                accept="image/x-png,image/jpeg"
                id="blogImg"
                style={{
                  width: "50%",
                  margin: "20px",
                  height: "50px"
                }}
                onChange={this.handleChangeOfImg}
              />
              {ImgUrlSave ? (
                <img
                  ref={this.ImgRef}
                  id="imgsrc"
                  src={"" + ImgUrlSave + ""}
                  style={{
                    width: "180px",
                    height: "108px",
                    padding: "8px",
                    position: "absolute"
                  }}
                  alt="Select"
                />
              ) : null}
            </div>
          </>
        ) : null}

        <div
          id="quillId"
          style={{
            position: stylesUpdates[0],
            width: stylesUpdates[1],
            backgroundColor: stylesUpdates[2],
            margin: stylesUpdates[3],
            height: stylesUpdates[4]
          }}
        >
          <ReactQuill
            theme={this.state.theme}
            onChange={this.handleChange}
            value={this.state.editorHtml}
            modules={Editor.modules}
            formats={Editor.formats}
            placeholder={this.props.placeholder}
          />
        </div>
        {this.props.statusButon ? (
          this.state.contentEdited ? (
            <SaveChangeButton
              chekCancelStatus={!this.state.cancelStatus}
              titledata={this.state.valueOftitle}
              backImg={ImgUrlSave}
              saveData={this.state.editorHtml}
              cancelTheSelected={this.props.cancelSelection}
              pathGainer={this.props.pathSelector}
            />
          ) : null
        ) : null}
      </>
    );
  }
}
export default Editor;

Editor.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ indent: "-1" }, { indent: "+1" }],
    ["link"]
  ],
  clipboard: {
    matchVisual: false
  }
};

Editor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "indent",
  "link"
];
