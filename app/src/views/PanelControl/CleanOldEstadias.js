import React, { useEffect , useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import CustomInput from "components/CustomInput/CustomInput";
import Button from "components/CustomButtons/Button";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import CardFooter from "components/Card/CardFooter";
import axios from "axios";


const styles = {
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  container: {
    justifyContent: 'center'
  }
};

const useStyles = makeStyles(styles);

export default function CleanOldStadias() {
  
  const classes = useStyles();
  
  const limpiarEstadias = () => {
    const token = axios.defaults.headers.common.Authorization

    if (token) {
      axios
        .get("http://127.0.0.1:8000/api/estadia/cleanOldStadias/")
        .then(response => {
          alert('¡Limpieza satisfactoria!')
      })
      .catch((error) => { 
        console.log('Error limpiarEstadias ', error) 
        alert('limpiarEstadias error')
      })
      }
  }

  return (
    <div>
      <GridContainer style={styles.container}>
        <GridItem xs={12} sm={12} md={8}>
          <Card styles={{textAlign: 'center'}}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Limpiar estadías</h4>
            </CardHeader>
            
            <CardFooter>
              <Button color="primary" onClick={() => limpiarEstadias()}>limpiar</Button>
            </CardFooter>
          </Card>
        </GridItem>
        
      </GridContainer>
    </div>
  );
}