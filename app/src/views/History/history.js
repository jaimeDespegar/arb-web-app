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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
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
  const [data, setData] = useState([]);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [userName, setUserName] = useState('');
  const [anonymous, setAnonymous] = useState(false);


  const findItems = () => {
    let filters = "?";

    if (fromDate) {
      filters+="fromDate="+format(fromDate, 'yyyy-MM-dd HH:mm:ss');
    }
    if (toDate) {
      filters+="&toDate="+format(toDate, 'yyyy-MM-dd HH:mm:ss');
    }
    if (anonymous) {
      filters+="&isAnonymous="+(anonymous?"True":"False");
    }
    if (userName) {
      filters+="&userName="+userName;
    }

    if (filters !== '?') {
      axios
      .get("http://127.0.0.1:8000/api/estadia/find" + filters)
      .then(res => res.data)
      .then((result) => {
          let values = result.map((item) => [item.userName, 
                                             'ungs', 
                                             item.placeUsed.toString(), 
                                             format(new Date(item.dateCreated), 'dd/MM/yyyy HH:mm:ss'), 
                                             <Button color="primary"> Ver </Button>])
          setData(values);
        },
        (error) => { console.log(error) }
      )
      .catch((error) => { console.log(error) })  
    } else {
      console.log("No hay fechas para filtrar");
    }
  }

  const handleChange = (event) => {
    setAnonymous(event.target.checked);
  };

  useEffect(() => { findItems() }, [])

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Busqueda Historial de Estadias</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy HH:mm:ss"
                        margin="normal"
                        id="date-picker-inline"
                        label="Fecha Desde"
                        value={fromDate}
                        onChange={setFromDate}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy HH:mm:ss"
                        margin="normal"
                        id="date-picker-inline"
                        label="Fecha Hasta"
                        value={toDate}
                        onChange={setToDate}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </GridItem>
              </GridContainer>
              
              <GridContainer>
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

                <GridItem xs={12} sm={12} md={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={anonymous}
                        onChange={handleChange}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label="Incluir Anonimas"
                  />
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
              tableHead={["Usuario", "Bicicletero", "Lugar", "Fecha creada", "Fotos"]}
              tableData={data}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}