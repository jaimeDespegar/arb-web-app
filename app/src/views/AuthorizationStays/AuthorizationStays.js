import React, { useEffect , useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import AccessTime from "@material-ui/icons/AccessTime";
import CustomInput from "components/CustomInput/CustomInput";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns'
import axios from 'axios';
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";


const useStyles = makeStyles(styles);

export default function History() {

  const classes = useStyles();
  const [pendingStays, setPendingStays] = useState([]);
  const [userName, setUserName] = useState('');
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);

  const openModalPhotos = () => {
    setOpen(true);
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
    .post("http://127.0.0.1:8000/api/estadia/authorize", data)
    .then(res => res.data)
    .then((result) => {
      alert('La estadia fue ' + message + ' con exito para el usuario ' + item.userName)
    })
    .catch((error) => { 
      console.error(error);
      alert('Se produjo un error inesperado al accionar sobre la estadia seleccionada')
    })
  }

  const photoBtn = () => {
    return <Button color="info" onClick={() => openModalPhotos()}>Verificar</Button>
  }

  const actionsBtn = (item) => {
    return (<>
              <Button color="success" disabled={item.isAuthorize===true} onClick={() => authorize(item, true)}>Autorizar</Button>
              <Button color="danger" disabled={item.isAuthorize===false} onClick={() => authorize(item, false)}>Denegar</Button>
            </>)
  }

  const findItems = () => {
    axios.defaults.headers.common.Authorization = 'Token 102db47a082861a2d59da854a33aa1166df2e02f'
    const buildState = (isAuthorize) => {
      return (isAuthorize === undefined || isAuthorize === null) ? 'Sin resolver' : (isAuthorize===true ? 'Aceptado': 'Denegado')
    }

    const filter = userName ? '?userName='+userName : ''

    axios
    .get("http://127.0.0.1:8000/api/estadia/pendings"+filter)
    .then(res => res.data)
    .then((pendings) => {
      const values = [];
      pendings.map( (item) => {
        let value = [item.userName, item.bicycleParking.description, item.place, 
                     format(new Date(item.dateCreated), 'HH:mm:ss dd/MM/yyyy  '),
                     buildState(item.isAuthorize),
                     photoBtn(), actionsBtn(item)]
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
              tableHead={["Usuario", "Bicicletero", "Lugar", "Fecha creada", "Estado", "Fotos", "Acciones"]}
              tableData={pendingStays}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="md">
          <DialogTitle id="form-dialog-title">Fotos sobre el pedido</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Visualize las fotos para determinar si aceptar o rechazar el pedido
            </DialogContentText>
            <Grid container>
            <GridItem xs={12} sm={12} md={6}>
              <Card chart>
                <CardHeader color="success">
                  <img
                    style={{ height: "200px", width: "100%", display: "block" }}
                    src={require('assets/images/Egress_3_11-11-2020_14:27:48.jpg')}
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
                    src={require('assets/images/Egress_3_11-11-2020_14:27:48.jpg')}
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>              
      </GridItem>
    </GridContainer>
  );
}