import React, { Component } from "react";
import Editor from "./editor";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SvgIcon from "@material-ui/core/SvgIcon";
import ContentDecider from "./blogContentViewer";
import { UserConsumer } from "../context/userVerification";
import SummaryCardCollection from "./publishCardCompo";
import firebase from "./fireStore";
import "@firebase/firestore";
import "firebase/firebase-database";
import ErrCompo from "./messageCompo";

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const stylesMain = ["static", "100%", "#ffffffb3", "0", "500px"];

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  icon: {
    margin: theme.spacing(2)
  },

  root: {
    display: "flex"
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  },
  quillSet: {
    position: "static",
    width: "auto",
    backgroundColor: "#ffffffb3",
    margin: 0
  }
}));

function NavBarSignout(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [home, setHome] = React.useState(true);
  const [addBlog, setaddBlog] = React.useState(false);
  const [addUpdate, setaddUpdate] = React.useState(false);

  const open = Boolean(anchorEl);

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handlePageOrder(targetname) {
    setHome(false);
    setaddBlog(false);
    setaddUpdate(false);
    switch (targetname) {
      case "Home": {
        setHome(true);
        break;
      }
      case "Create post": {
        setaddBlog(true);
        break;
      }
      case "Published": {
        setaddUpdate(true);

        break;
      }
      default: {
        console.log("default case");
        break;
      }
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          />
          <Typography variant="h6" className={classes.title}>
            <UserConsumer>
              {props => {
                return props.email;
              }}
            </UserConsumer>
          </Typography>
          <Typography variant="h6" className={classes.title} />

          <div>
            <IconButton
              aria-label="Account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <span onClick={props.onClikLogoutIn}>Logout</span>
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {["Home", "Create post"].map((text, index) => (
            <ListItem button key={text} onClick={() => handlePageOrder(text)}>
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <HomeIcon className={classes.icon} color="primary" />
                ) : (
                  <MailIcon className={classes.icon} color="primary" />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Published"].map((text, index) => (
            <ListItem button key={text} onClick={() => handlePageOrder(text)}>
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <InboxIcon className={classes.icon} color="primary" />
                ) : (
                  <MailIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <>{props.updatePageShuffler ? null : null}</>

        {home && props.updatePageShuffler ? (
          <>
            <ContentDecider
              changeTarget={props.changeContent}
              doDeleteStepsHandler={props.onDoDeleteChange}
            />
            {props.deleteState ? (
              <ErrCompo
                statusVal={true}
                errorwarn={"success"}
                message={"successfully deleted . ."}
              />
            ) : null}
          </>
        ) : (
          <>
            {home ? (
              <div>
                <Editor
                  pathSelector={props.pathIdentifier}
                  statusButon={props.statusChekButonIn}
                  dataInnerComponent={props.dataHandlerFromProp}
                  stylesChanger={stylesMain}
                  placeholder={"write your heart hear"}
                  Update={"update"}
                  cancelSelection={props.cancelbtnHolder}
                />
              </div>
            ) : null}
          </>
        )}

        {addBlog ? (
          <div>
            <Editor
              statusButon={props.statusChekButonIn}
              stylesChanger={stylesMain}
              placeholder={"write your heart hear"}
            />
          </div>
        ) : null}

        {addUpdate ? <SummaryCardCollection /> : null}
      </main>
    </div>
  );
}

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathCheck: 0,
      renderUpdatePage: true,
      dataObtained: "",
      deleteStatus: false
    };
  }

  cancelChanges = () => {
    this.setState({ renderUpdatePage: true });
  };
  onHandleDeleteComponent = removeIdentity => {
    return (
      firebase
        .database()
        .ref()
        .child(localStorage.getItem("user") + "/A" + removeIdentity)
        .remove(),
      function(error) {
        if (error) {
          console.log(error);
        } else {
          this.setState({ deleteStatus: true });
          this.timeout = setTimeout(
            this.setState({ deleteStatus: false }),
            6000
          );
        }
      }
    );
  };
  onClickNavBarChanger = (targetPath, data) => {
    this.setState({
      renderUpdatePage: false,
      pathCheck: targetPath,
      dataObtained: data
    }); // page updation will happen in false
  };
  render() {
    return (
      <NavBarSignout
        dataHandlerFromProp={this.state.dataObtained}
        pathIdentifier={this.state.pathCheck}
        onDoDeleteChange={this.onHandleDeleteComponent}
        updatePageShuffler={this.state.renderUpdatePage}
        changeContent={this.onClickNavBarChanger}
        onClikLogoutIn={this.props.onClikLogout}
        statusChekButonIn={this.props.statusChekButon}
        cancelbtnHolder={this.cancelChanges}
        deleteState={this.state.deleteStatus}
      />
    );
  }
}

export default Navbar;
