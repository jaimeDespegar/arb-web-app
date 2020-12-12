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
import DialogCustom from 'components/Dialog/DialogCustom';
import { format } from 'date-fns'
import axios from 'axios';
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { headerAuthorization } from "./../../variables/token";
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(styles);

export default function AuthorizationStays() {

  const classes = useStyles();
  const [pendingStays, setPendingStays] = useState([]);
  const [userName, setUserName] = useState('');
  const [open, setOpen] = React.useState(false);
  const [itemSelected, setItemSelected] = useState({});

  const openModalPhotos = (item) => {
    setOpen(true);
    setItemSelected(item);
  };

  const handleClose = () => {
    setOpen(false);
  };  

  const authorize = (item, value) => {

    const data = {
      userName: item.userName,
      bicycleParking: item.bicycleParking.number,
      place: item.place,
      isAuthorize: value
    }

    const message = value ? 'aceptada' : 'denegada'

    axios
      .post("http://127.0.0.1:8000/api/estadia/authorize", data, headerAuthorization())
      .then(res => res.data)
      .then((result) => {
        alert('La estadia fue ' + message + ' con exito para el usuario ' + item.userName);
        findItems();
      })
      .catch((error) => { 
        console.error(error);
        alert('Se produjo un error inesperado al accionar sobre la estadia seleccionada')
      })
  }

  const photoBtn = (item) => {
    return <Button color="info" onClick={() => openModalPhotos(item)}>Verificar</Button>
  }

  const actionsBtn = (item) => {
    return (<>
              <Button color="success" disabled={item.isActive===false} onClick={() => authorize(item, true)}>Autorizar</Button>
              <Button color="danger" disabled={item.isActive===false} onClick={() => authorize(item, false)}>Denegar</Button>
            </>)
  }

  const findItems = () => {

    const buildState = (isAuthorize) => {
      return (isAuthorize === undefined || isAuthorize === null) ? 'Sin resolver' : (isAuthorize===true ? 'Aceptado': 'Denegado')
    }

    const filter = (userName ? '?userName='+userName : '')

    axios
    .get("http://127.0.0.1:8000/api/estadia/pendings"+filter, headerAuthorization())
    .then(res => res.data)
    .then((pendings) => {
      const values = [];
      pendings.map( (item) => {
        let value = [item.userName, item.bicycleParking.description, item.place, 
                     format(new Date(item.dateCreated), 'HH:mm:ss dd/MM/yyyy  '),
                     buildState(item.isAuthorize),
                     photoBtn(item), actionsBtn(item)]  
        values.push(value);
      })
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
                <GridItem xs={12} sm={12} md={8} >
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
              <Button color="info" onClick={() => findItems()}>Buscar' '<Icon className="fa fa-search" style={{ fontSize: 30 }}/></Button>
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
              tableHead={["Usuario", "Bicicletero", "Lugar", "Fecha creada", "Estado", "Fotos", "Acciones"]}
              tableData={pendingStays}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem>
        <DialogCustom titleDialog={"Fotos sobre el pedido"} isEditionDialog={false}
                      dialogContentText={"Visualize las fotos para determinar si aceptar o rechazar el pedido"}
                      isOpen={open} closeFunction={handleClose}
                      componentContent={
                        <Grid container>
                          <GridItem xs={12} sm={12} md={6}>
                            <Card chart>
                              <CardHeader color="success">
                                <img
                                  style={{ height: "200px", width: "100%", display: "block" }}
                                  src={itemSelected && itemSelected.photos ? itemSelected.photos.entrance : ''}
                                  alt='...'
                                />
                              </CardHeader>
                              <CardBody>
                                <h4 className={classes.cardTitle}>Entrada de la bicicleta</h4>
                              </CardBody>
                              <CardFooter chart>
                              </CardFooter>
                            </Card>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={6}>
                            <Card chart>
                              <CardHeader color="warning">
                                <img
                                  style={{ height: "200px", width: "100%", display: "block" }}
                                  src={require('assets/images/cover.jpeg')}
                                  alt='...'
                                />
                              </CardHeader>
                              <CardBody>
                                <h4 className={classes.cardTitle}>Perfil del usuario</h4>
                              </CardBody>
                              <CardFooter chart>
                                
                              </CardFooter>
                            </Card>
                          </GridItem>
                        </Grid>
                      }>
        </DialogCustom>
      </GridItem>
    </GridContainer>
  );
}