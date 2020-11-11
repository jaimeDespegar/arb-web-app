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

export default function Login() {
  
  const classes = useStyles();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(!axios.defaults.headers.common.Authorization)

  const login = () => {

    if (axios.defaults.headers.common.Authorization) {
      //axios.defaults.headers.common.Authorization = null;
    }

    const data = { 'username': userName, 'password': password }

    axios
      .post("http://127.0.0.1:8000/api/auth/login/", data)
      .then(response => {
        const { token } = response.data;
        axios.defaults.headers.common.Authorization = `Token ${token}`;
        alert('User logged: ' + userName);
        setUserName('');
        setPassword('');
        setShowLogin(false);
      })
      .catch((error) => { 
        console.log('Error login ', error) 
        alert('Verifique que los datos ingresados sean correctos')
      })
  }

  const logout = () => {

    const data = { 'username': userName }

    if (axios.defaults.headers.common.Authorization) {
      axios
      .get("http://127.0.0.1:8000/api/auth/logout/")
      .then(response => {
        axios.defaults.headers.common.Authorization = null;
        alert('Logout OK');
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
              <Button color="primary" onClick={() => login()}>Ingresar</Button>
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
              <Button color="primary" onClick={() => logout()}>Salir</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}