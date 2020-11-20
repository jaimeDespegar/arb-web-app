import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import GridItem from "components/Grid/GridItem";
import Grid from "@material-ui/core/Grid";
import GridContainer from "components/Grid/GridContainer";
import FormLabel from "@material-ui/core/FormLabel";
import Paper from "@material-ui/core/Paper";
import CustomInput from "components/CustomInput/CustomInput";
import Button from "components/CustomButtons/Button";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import CardFooter from "components/Card/CardFooter";
import Table from "components/Table/Table.js";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);

  const [userNameCreate, setUserNameCreate] = React.useState('');
  const [passwordCreate, setPasswordCreate] = React.useState(''); 
  const [emailCreate, setEmailCreate] = React.useState('');
  const [bicyclePhotoCreate, setBicyclePhoto] = React.useState('');
  const [profilePhotoCreate, setProfilePhoto] = React.useState('');
  const [petCreate, setPetCreate] = React.useState('');
  const [streetCreate, setStreetCreate] = React.useState('');
  const [movieCreate, setMovieCreate] = React.useState('');

  const [users, setUsers] = React.useState([]);
  const [owner, setOwner] = React.useState([]); 

  const [username, setUsername] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    cleanForm();
    setOpen(false);
    setIsEdit(false);
  };

  const cleanForm = () => {
    setUserNameCreate('');
    setPasswordCreate('');
    setEmailCreate('');
    setBicyclePhoto('');
    setProfilePhoto('');
    setPetCreate('');
    setStreetCreate('');
    setMovieCreate('');
  }

  const saveUser = () => {
    const token = axios.defaults.headers.common.Authorization;
    const data = {
      username: userNameCreate,
      password: passwordCreate,
      email: emailCreate,
      bicyclePhoto : bicyclePhotoCreate,
      profilePhoto : profilePhotoCreate,
      pet : petCreate,
      street : streetCreate,
      movie : movieCreate,
    }
    console.log('user to post ', data)
    const params = {
      method: 'POST',
      headers: {
       'Content-type': 'application/json' // Indicates the content 
      },
      body: data // We send data in JSON format
    }

    if (isEdit) {
      confirmUpdateUser(data);
    } else {
      createUser(params, token);
    }
    
  }
  
  const createUser = (params, token) => {
    if (token) {
      axios
        .post("http://127.0.0.1:8000/api/auth/register/", params)
        .then(res => res.params)
        .then((result) => {
            cleanForm();
            setOpen(false);
            alert('¡Usuario agregado!')
        })
        .catch((error) => { 
          console.log('Error, Usuario no creado', error) 
        })  
    } else {
      console.log('BicycleParking: no hay token')
    }
  }

  const findUsers = () => {
    const token = axios.defaults.headers.common.Authorization;

    const filter = username ? '?user.username='+username : ''
    
    //.get("http://127.0.0.1:8000/api/bikeOwnerParser-getAll/"+filter)
    if (token) {
      axios
        .get("http://127.0.0.1:8000/api/bikeOwnerParser-Find"+filter)
        .then(res => res.data)
        .then((result) => {
          let values = result.map((item) => [item.username, 
                                             item.email, 
                                             "bikeOwner",
                                             <Button color="warning" onClick={e => updateUser(item)}> Editar </Button>,
                                             <Button color="danger" onClick={e => deleteUser(item)}> Borrar </Button>,
                                            ])


          setUsers(values);
          console.log("bikeOwner-getAll: ",result);
        })
        .catch((error) => { console.log('Error bike Owner getAll ', error) })  
    } else {
      console.log('User: no hay token')
    }
  }


  const updateUser = (user) => {
    setUserNameCreate(user.username);
    setPasswordCreate(user.password);
    setEmailCreate(user.email);
    setBicyclePhoto(user.bicyclePhoto);
    setProfilePhoto(user.profilePhoto);
    setPetCreate(user.pet);
    setStreetCreate(user.street);
    setMovieCreate(user.movie);
    setIsEdit(true);
    setOpen(true);
  }
  const confirmUpdateUser = (user) => {
    const token = axios.defaults.headers.common.Authorization;
  
    if (token) {
      axios
        .put("http://127.0.0.1:8000/api/bikeOwner/update/"+user.username +'/', user)
        .then(res => res.data)
        .then((result) => {
          alert('Usuario Actualizado');
          cleanForm();
          setIsEdit(false);
          setOpen(false);
        })
        .catch((error) => { console.error('Error update usuario ', error) })
    } else {
      console.log('Update usuario: no hay token')
    }
  }
  const deleteUser = (user) => {
    const token = axios.defaults.headers.common.Authorization;

    if (token) {
      axios
        .delete("http://127.0.0.1:8000/api/bikeOwner-delete/"+ user.username+"/",user)
        .then(res => res.data)
        .then((result) => {
          alert('bikeOwner eliminado')
        })
        .catch((error) => { console.log('Error delete bikeOwner ', error) })  
    } else {
      console.log('Delete bikeOwner: no hay token')
    }
  }

  useEffect(() => { findUsers() }, [])

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Usuarios</h4>
              {/* <p className={classes.cardCategoryWhite}>Complete your profile</p> */}
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Ingrese el nombre de un usuario"
                    id="first-name"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6} style={{marginTop: 25}}>
                  <Button color="info" onClick={() => findUsers()}>Buscar</Button>
                  <Button color="success" onClick={handleClickOpen}>Nuevo</Button>
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Resultados</h4>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="info"
              tableHead={["Usuario", "Email", "Tipo", "Editar", "Borrar"]}
              tableData={users}
            />
          </CardBody>
        </Card>
      </GridItem>
      </GridContainer>


      <GridContainer>
        {(!users.length) ? 
          (<Grid item xs={12}>
             <Paper className={classes.control}>
               <Grid container>
                 <Grid item>
                   <FormLabel>No hay users registrados.</FormLabel>
                 </Grid>
               </Grid>
             </Paper>
          </Grid>) : ''
        }

        {users.map((user) => (
          <Grid container key ={user.username} className={classes.root} spacing={2}>      
            <Grid item xs={12}>
              <Paper className={classes.control}>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={6} style={{marginTop:15}}>
                      <FormLabel>{user.email}</FormLabel>
                    </Grid>  
                  </Grid>
             </Paper>
           </Grid>
         </Grid>          
        ))}
      </GridContainer>




      <GridContainer>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Nuevo Usuario</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Cargue los datos del Usuario
            </DialogContentText>

            <TextField
              id="id-userNameCreate"
              label="Nombre de usuario"
              type="email"
              value={userNameCreate}
              onChange={e=>setUserNameCreate(e.target.value)}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="passwordCreate"
              label="Contraseña"
              type="password"
              value={passwordCreate}
              onChange={e=>setPasswordCreate(e.target.value)}
              fullWidth
            />
             <TextField
              id="emailCreate"
              label="Email"
              type="email"
              value={emailCreate}
              onChange={e=>setEmailCreate(e.target.value)}
              fullWidth
            />
            <TextField
              id="bicyclePhotoCreate"
              label="Foto de bicicleta"
              type="email"
              value={bicyclePhotoCreate}
              onChange={e=>setBicyclePhoto(e.target.value)}
              fullWidth
            />
            <TextField
              id="profilePhotoCreate"
              label="Foto de perfil"
              type="email"
              value={profilePhotoCreate}
              onChange={e=>setProfilePhoto(e.target.value)}
              fullWidth
            />
            <TextField
              id="petCreate"
              label="Nombre de mascota"
              type="email"
              value={petCreate}
              onChange={e=>setPetCreate(e.target.value)}
              fullWidth
            />
            <TextField
              id="streetCreate"
              label="Nombre de su calle"
              type="email"
              value={streetCreate}
              onChange={e=>setStreetCreate(e.target.value)}
              fullWidth
            />
            <TextField
              id="movieCreate"
              label="Película favorita"
              type="email"
              value={movieCreate}
              onChange={e=>setMovieCreate(e.target.value)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={saveUser} color="primary">
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
