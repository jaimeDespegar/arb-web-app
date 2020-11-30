import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import Button from "components/CustomButtons/Button";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import FormLabel from "@material-ui/core/FormLabel";
import CardHeader from "components/Card/CardHeader";
import CardFooter from "components/Card/CardFooter";
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import { headerAuthorization } from "./../../variables/token";

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
  const [seconds, setSeconds] = React.useState(60);

  const limpiarEstadias = () => {
    axios
      .get("http://127.0.0.1:8000/api/estadia/cleanOldStadias/", headerAuthorization())
      .then(response => {
        alert('¡Limpieza satisfactoria!')
    })
    .catch((error) => { 
      console.log('Error limpiarEstadias ', error) 
      alert('Error al limpiar estadías anteriores')
    })
  }
  
  const loadConfiguration = () => {
    axios
      .get("http://127.0.0.1:8000/api/configuration/secondsPending/", headerAuthorization())
      .then(response => {
        if (response.data && response.data.configurationValue) {
          setSeconds(response.data.configurationValue);
        }
      })
    .catch((error) => { 
      console.log('Error buscando la configuracion ', error);
    })
  }

  const updateConfiguration = () => {
    const data = {
      value: seconds
    }
    axios
      .put("http://127.0.0.1:8000/api/configuration/update/secondsPending/", data, headerAuthorization())
      .then(response => {
        alert('¡Valor actualizado!');
      })
    .catch((error) => { 
      console.log('Error buscando la configuracion ', error);
      alert('Error inesperado al actualizar la configuracion');
    })
  }

  useEffect(() => { loadConfiguration() }, [])

  return (
    <div>
      <GridContainer style={styles.container}>
        <GridItem xs={12} sm={12} md={8}>
          <Card styles={{textAlign: 'center'}}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Configuraciones</h4>
            </CardHeader>
            <CardBody>
              <Button color="primary" onClick={() => limpiarEstadias()}>Limpiar Estadías previas</Button>
            </CardBody>
            <CardFooter>
              {/* <Button color="primary" onClick={() => limpiarEstadias()}>Limpiar estadías previas</Button> */}
            </CardFooter>
          </Card>
          <Card styles={{textAlign: 'center'}}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Estadías</h4>
            </CardHeader>
            <CardBody>
              <FormLabel style={{marginTop: 30, marginRight: 20}}>Tiempo para considerar pendientes </FormLabel>
              <TextField
                id="count-seconds" label="Segundos" type="number"
                value={seconds} onChange={e=>setSeconds(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={() => updateConfiguration()}>Guardar cambios</Button>
            </CardFooter>
          </Card>
        </GridItem>
        
      </GridContainer>
    </div>
  );
}