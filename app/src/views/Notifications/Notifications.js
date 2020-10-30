/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
// core components
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import Button from "components/CustomButtons/Button";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Snackbar from "components/Snackbar/Snackbar.js";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function Notifications() {
  const classes = useStyles();
  const [bc, setBC] = React.useState(false);
  React.useEffect(() => {
    // Specify how to clean up after this effect:
    return function cleanup() {
      // to stop the warning of calling setState of unmounted component
      var id = window.setTimeout(null, 0);
      while (id--) {
        window.clearTimeout(id);
      }
    };
  });
  const showNotification = place => {
    switch (place) {
      case "bc":
        if (!bc) {
          setBC(true);
          setTimeout(function() {
            setBC(false);
          }, 6000);
        }
        break;
      default:
        break;
    }
  };
  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Notifications</h4>
        <p className={classes.cardCategoryWhite}>
          Handcrafted by our friends from{" "}
          <a
            target="_blank"
            href="https://material-ui-next.com/?ref=creativetime"
          >
            Material UI
          </a>{" "}
          and styled by{" "}
          <a
            target="_blank"
            href="https://www.creative-tim.com/?ref=mdr-notifications-page"
          >
            Creative Tim
          </a>
          . Please checkout the{" "}
          <a href="#pablo" target="_blank">
            full documentation
          </a>
          .
        </p>
      </CardHeader>
      <CardBody>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <h5>Notifications Style</h5>
            <br />
            <SnackbarContent message={"This is a plain notification"} />
            <SnackbarContent
              message={"This is a notification with close button."}
              close
            />
            <SnackbarContent
              message={"This is a notification with close button and icon."}
              close
              icon={AddAlert}
            />
            <SnackbarContent
              message={
                "This is a notification with close button and icon and have many lines. You can see that the icon and the close button are always vertically aligned. This is a beautiful notification. So you don't have to worry about the style."
              }
              close
              icon={AddAlert}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <h5>Notifications States</h5>
            <br />
            <SnackbarContent
              message={
                'INFO - This is a regular notification made with color="info"'
              }
              close
              color="info"
            />
            <SnackbarContent
              message={
                'SUCCESS - This is a regular notification made with color="success"'
              }
              close
              color="success"
            />
            <SnackbarContent
              message={
                'WARNING - This is a regular notification made with color="warning"'
              }
              close
              color="warning"
            />
            <SnackbarContent
              message={
                'DANGER - This is a regular notification made with color="danger"'
              }
              close
              color="danger"
            />
            <SnackbarContent
              message={
                'PRIMARY - This is a regular notification made with color="primary"'
              }
              close
              color="primary"
            />
          </GridItem>
        </GridContainer>
        <br />
        <br />
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={6} style={{ textAlign: "center" }}>
            <h5>
              Notifications Places
              <br />
              <small>Click to view notifications</small>
            </h5>
          </GridItem>
        </GridContainer>
        <GridContainer justify={"center"}>
          <GridItem xs={12} sm={12} md={10} lg={8}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <Button
                  fullWidth
                  color="primary"
                  onClick={() => showNotification("bc")}
                >
                  Bottom Center
                </Button>
                <Snackbar
                  place="bc"
                  color="info"
                  icon={AddAlert}
                  message="Welcome to MATERIAL DASHBOARD React - a beautiful freebie for every web developer."
                  open={bc}
                  closeNotification={() => setBC(false)}
                  close
                />
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </CardBody>
    </Card>
  );
}
