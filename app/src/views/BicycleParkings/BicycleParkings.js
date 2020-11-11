import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer";
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem";
import FormLabel from "@material-ui/core/FormLabel";
import Paper from "@material-ui/core/Paper";
import DirectionsBike from '@material-ui/icons/DirectionsBike';
import PlaceIcon from '@material-ui/icons/Place';
import CustomInput from "components/CustomInput/CustomInput";
import Button from "components/CustomButtons/Button";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import CardFooter from "components/Card/CardFooter";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom:30
  },
  paper: {
    height: 80,
    width: 90,
    backgroundColor: "#ef5350",
    justifyContent:'center',
    alignItems: 'center'
  },
  control: {
    padding: theme.spacing(2)
  }
}));

export default function BicycleParkings() {
  
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [spacing] = React.useState(1);
  const [parkings, setParkings] = React.useState([]);
  const [descriptionParking, setDescriptionParking] = React.useState(''); 
  const [numberBicycleParking, setNumberBicycleParking] = React.useState(0);
  const [countPlaces, setCountPlaces] = React.useState(1);
  const [isEdit, setIsEdit] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    cleanForm();
    setOpen(false);
    setIsEdit(false);
  };

  const cleanForm = () => {
    setNumberBicycleParking(0);
    setDescriptionParking('');
    setCountPlaces(1);
  }

  const saveBicycleParking = () => {
    const token = axios.defaults.headers.common.Authorization;
    const data = {
      number: numberBicycleParking,
      description: descriptionParking,
      places: countPlaces, 
      positionX: 10,
      positionY: 20
    }
    if (isEdit) {
      confirmUpdateBicycleParking(data);
    } else {
      createBicycleParking(data, token);
    }
  }

  const createBicycleParking = (data, token) => {
    if (token) {
      axios
        .post("http://127.0.0.1:8000/api/bicycleParking-create/", data)
        .then(res => res.data)
        .then((result) => {
            cleanForm();
            setOpen(false);
            alert('¡Bicicletero agregado!')
        })
        .catch((error) => { 
          console.log('Error bicycly parkings ', error) 
        })  
    } else {
      console.log('BicycleParking: no hay token')
    }
  }

  const findBicycleParkings = () => {
    const token = axios.defaults.headers.common.Authorization;
    
    if (token) {
      axios
        .get("http://127.0.0.1:8000/api/bicycleParkingAndPlaces/")
        .then(res => res.data)
        .then((result) => {
            setParkings(result);
        })
        .catch((error) => { console.log('Error bicycle parkings ', error) })  
    } else {
      console.log('BicycleParking: no hay token')
    }
  }
  
  const updateBicycleParking = (parking) => {
    setNumberBicycleParking(parking.number);
    setDescriptionParking(parking.description);
    setCountPlaces(parking.places.length);
    setIsEdit(true);
    setOpen(true);
  }

  const confirmUpdateBicycleParking = (parking) => {
    const token = axios.defaults.headers.common.Authorization;
 
    if (token) {
      axios
        .put("http://127.0.0.1:8000/api/bicycleParking-update/", parking)
        .then(res => res.data)
        .then((result) => {
          alert('Bicicletero Actualizado');
          cleanForm();
          setIsEdit(false);
          setOpen(false);
        })
        .catch((error) => { console.error('Error update bicycle parking ', error) })
    } else {
      console.log('Update BicycleParking: no hay token')
    }
  }

  const deleteBicycleParking = (parking) => {
    const token = axios.defaults.headers.common.Authorization;

    if (token) {
      axios
        .delete("http://127.0.0.1:8000/api/bicycleParking-delete/"+ parking.number+"/")
        .then(res => res.data)
        .then((result) => {
          alert('Bicicletero eliminado')
        })
        .catch((error) => { console.log('Error delete bicycle parking ', error) })  
    } else {
      console.log('Delete BicycleParking: no hay token')
    }
  }

  useEffect(() => { findBicycleParkings() }, [])

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Bicicleteros</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Ingrese un bicicletero"
                    id="first-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6} style={{marginTop: 25}}>
                  <Button color="info">Buscar</Button>
                  <Button color="success" onClick={handleClickOpen}>Nuevo</Button>
                </GridItem>
                <GridItem xs={12} sm={12} md={2} style={{marginTop: 25}}>
                  <Button color="info">Ver Mapa</Button>
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>

      <GridContainer>
        {(!parkings.length) ? 
          (<Grid item xs={12}>
             <Paper className={classes.control}>
               <Grid container>
                 <Grid item>
                   <FormLabel>No hay bicicleteros registrados.</FormLabel>
                 </Grid>
               </Grid>
             </Paper>
          </Grid>) : ''
        }

        {parkings.map((parking) => (
          <Grid container key ={parking.number} className={classes.root} spacing={2}>      
             
            <Grid item xs={12}>
              <Grid container justify="center" spacing={spacing} >
                {parking.places.length ? (parking.places.map((place) => (
                  <Grid key={parking.number + '_' + place.placeNumber } item>
                    <Paper elevation={8} className={classes.paper} 
                           children={place.occupied ? <div><DirectionsBike fontSize='large'/></div> : <div><PlaceIcon fontSize='large'/></div>}
                           style={{display: 'flex', 'backgroundColor': place.occupied ? '#ef5350':'#66bb6a'}}/>
                  </Grid> 
                ))): (<></>)}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.control}>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={6} style={{marginTop:15}}>
                      <FormLabel>{parking.description}</FormLabel>
                    </Grid>  
                  <Grid item xs={12} sm={12} md={6} style={{marginTop:0, display:'flex', justifyContent:'flex-end'}}>
                      <Button color="warning" onClick={e => updateBicycleParking(parking)}> Editar </Button>
                      <Button color="danger" onClick={e => deleteBicycleParking(parking)}> Borrar </Button>
                  </Grid>
                  </Grid>
             </Paper>
           </Grid>
         </Grid>          
        ))}
      </GridContainer>
      
      <GridContainer>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Nuevo Bicicletero</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Cargue los datos de su bicicletero
            </DialogContentText>
            <TextField
              id="id-parking"
              label="Nro de Identificación"
              type="number"
              value={numberBicycleParking}
              onChange={e=>setNumberBicycleParking(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="description"
              label="Descripción"
              type="email"
              value={descriptionParking}
              onChange={e=>setDescriptionParking(e.target.value)}
              fullWidth
            />
             <TextField
              id="count-places"
              label="Cantidad de lugares"
              type="number"
              value={countPlaces}
              onChange={e=>setCountPlaces(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={saveBicycleParking} color="primary">
              Guardar
            </Button>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>              
      </GridContainer>
    </div>
  );
}