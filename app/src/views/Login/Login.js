import React, { useState } from "react";
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
import { getItem, saveItem, removeItem, headerAuthorization } from "./../../variables/token";
import Icon from '@material-ui/core/Icon';
import { APP_URL } from './../../variables/utils.js';


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

export default function Login() {
  
  const classes = useStyles();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(!getItem('token'))

  const login = () => {

    const data = { 'username': userName, 'password': password }

    axios
      .post(APP_URL + "auth/login/", data)
      .then(response => {
        const { token } = response.data;
        saveItem('token', token);
        alert('Hola ' + userName+'. Ya puede navegar en ARB');
        setUserName('');
        setPassword('');
        setShowLogin(false);
      })
      .catch((error) => { 
        console.log('Error login ', error) 
        alert('Error al loguerase. Verifique que los datos ingresados sean correctos.')
      })
  }

  const logout = () => {

    if (getItem('token')) {
      axios
      .get(APP_URL + "auth/logout/", headerAuthorization())
      .then(response => {
        removeItem('token');
        alert('¡Adios! Gracias por usar ARB');
        setShowLogin(true);
      })
      .catch((error) => { 
        console.log('Error login ', error) 
      })
    } else {
      alert("El usuario ya esta deslogueado")
    }
    
  }

  return (
    <div>
      <GridContainer style={styles.container}>
        <GridItem xs={12} sm={12} md={8} visible={showLogin}>
          <Card styles={{textAlign: 'center'}}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Iniciar Sesion</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Nombre de Usuario"
                    id="username"
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                    formControlProps={{ fullWidth: true }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Contraseña"
                    id="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    formControlProps={{ fullWidth: true }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={() => login()}>Ingresar.
<Icon className="fa fa-key"/></Button>

            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={8} visible={!showLogin}>
          <Card styles={{textAlign: 'center'}}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Cerrar Sesion</h4>
            </CardHeader>
            <CardBody>
              <GridContainer style={{justifyContent: 'center'}}>
                <h5>¡Bienvenido a Sistemas ARB!</h5>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={() => logout()}>
                Salir.
                <Icon className="fa fa-sign-out"/>
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}