import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  },
  align: {
    fontSize: 12,
    height: 36,
    overflow: "scroll",
    marginBottom: 11
  },
  font: {
    fontSize: 12,
    height: 40,
    overflow: "scroll"
  }
});
function SimpleCard(props) {
  const classes = useStyles();

  return (
    <div
      style={{
        float: "left",
        margin: "50px 40px 10px 60px",
        width: "300px"
      }}
    >
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={props.titleData}
            height="140"
            image={props.imgUrlSpec}
            title="Light Up Your Thoughts"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.font}
            >
              {props.titleData}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="div"
              className={classes.align}
            >
              {props.dataContainer
                .replace(/<\s*br[^>]?>/, "\n")
                .replace(/(<([^>]+)>)/g, "")
                .replace(/nbsp;/g, "")}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <button
            className={"btn btn-primary btn-sm"}
            aria-label={props.publishTar}
            onClick={props.clickHandler}
          >
            Read
          </button>
        </CardActions>
      </Card>
    </div>
  );
}

class SummaryCardCompo extends Component {
  render() {
    return (
      <>
        <SimpleCard
          titleData={this.props.titleHead}
          dataContainer={this.props.dataInner}
          imgUrlSpec={this.props.imagePath}
          publishTar={this.props.publishedId}
          clickHandler={this.props.onClickRead}
        />
      </>
    );
  }
}

export default SummaryCardCompo;
