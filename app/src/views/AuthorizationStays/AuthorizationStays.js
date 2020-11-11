import React, { useEffect , useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns'
import axios from 'axios';

const styles = {
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

export default function History() {

  const classes = useStyles();
  const [pendingStays, setPendingStays] = useState([]);
  const [userName, setUserName] = useState('');
  const [data, setData] = useState([]);

  const authorize = (item, value) => {

    const data = {
      userName: '',
      bicycleParking: 1,
      place: 0,
      isAuthorize: value
    }

    axios
    .post("http://127.0.0.1:8000/api/estadia/authorize", data)
    .then(res => res.data)
    .then((result) => {
      
    })
    .catch((error) => { 
      console.log(error) 
    })
  }

  const photoBtn = () => <Button color="info" onClick={() => alert("Mostrar fotos")}>Verificar</Button>
  const actionsBtn = (item) => {
    return (<>
              <Button color="success" onClick={() => authorize(item, true)}>Autorizar</Button>
              <Button color="danger" onClick={() => authorize(item, false)}>Denegar</Button>
            </>)
  }

  const findItems = () => {
    axios
    .get("http://127.0.0.1:8000/api/estadia/pendings")
    .then(res => res.data)
    .then((pendings) => {
      const values = [];
      pendings.map( (item) => {
        let value = [item.userName, 1, item.place, item.dateCreated, photoBtn(), actionsBtn()]
        values.push(value);
      })
      console.log('values ', values);
      setPendingStays(values);
    })
    .catch((error) => { 
      console.log(error) 
    })
  }

  useEffect(() => { findItems() }, [])

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Busqueda estadias para autorizar</h4>
            </CardHeader>
            <CardBody>
              <GridContainer style={{ display: "flex", justifyContent: "center", 
                alignItems: "center"
              }}>
                <GridItem xs={12} sm={12} md={4} >
                    <Grid container justify="space-around" >
                      <CustomInput
                        labelText="Nombre de usuario"
                        id="user-name"
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </Grid>
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="info" onClick={() => findItems()}>Buscar</Button>
            </CardFooter>
          </Card>
      </GridItem>

      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Resultados</h4>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="info"
              tableHead={["Usuario", "Bicicletero", "Lugar", "Fecha creada", "Fotos", "Acciones"]}
              tableData={pendingStays}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}