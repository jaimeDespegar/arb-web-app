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
import DialogCustom from 'components/Dialog/DialogCustom';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import axios from 'axios';
import ExportExcel from 'react-export-excel';

const ExcelFile = ExportExcel.ExcelFile;
const ExcelSheet = ExportExcel.ExcelSheet;
const ExcelColumn = ExportExcel.ExcelColumn;

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
  const [suspected, setSuspected] = useState(false);
  const [open, setOpen] = React.useState(false);

  const openModalPhotos = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };  
  const [history, setHistory] = useState([]);
  const findItems = () => {
    const token = axios.defaults.headers.common.Authorization
    console.log('history token ', token)
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
    if (suspected) {
      filters+="&isSuspected="+(suspected?"True":"False");
    }
    if (userName) {
      filters+="&userName="+userName;
    }

    if (filters !== '?') {
      axios
      .get("http://127.0.0.1:8000/api/estadia/find" + filters)
      .then(res => res.data)
      .then((result) => {
          setHistory(result)
          let values = result.map((item) => [item.userName, 
                                             'ungs', 
                                             item.placeUsed.toString(), 
                                             format(new Date(item.dateCreated), 'dd/MM/yyyy HH:mm:ss'), 
                                             'SI/NO',
                                             <Button color="primary" onClick={() => openModalPhotos()}> Ver </Button>
                                            ])
          setData(values);
        }
      )
      .catch((error) => { console.log(error) })  
    } else {
      console.log("No hay filtros seleccionados");
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
              
              <GridContainer style={{
                display: "flex", justifyContent: "center", alignItems: "center"
              }}>
                <GridItem xs={12} sm={12} md={3} >
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
                <GridItem xs={12} sm={12} md={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={anonymous}
                        onChange={handleChange}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label="Solo anonimas"
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={suspected}
                        onChange={(event) => { setSuspected(event.target.checked) }}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label="Solo sospechosas"
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
              tableHead={["Usuario", "Bicicletero", "Lugar", "Fecha creada", "Sospechosa", "Fotos"]}
              tableData={data}
            />
            <ExcelFile element={<button>Exportar a excel</button>} filename="Historial">
                    <ExcelSheet data={history} name="Historial">
                      <ExcelColumn label="lugar" value="placeUsed"/>
                      <ExcelColumn label="fecha" value="dateCreated"/>
                      <ExcelColumn label="usuario" value="userName"/>
                    </ExcelSheet>  
                  </ExcelFile>
          </CardBody>
        </Card>
      </GridItem>

      <GridItem>
        <DialogCustom titleDialog={"Fotos de la estadia"} isEditionDialog={false}
                      isOpen={open} closeFunction={handleClose}
                      componentContent={
                        <Grid container>
                          <GridItem xs={12} sm={12} md={6}>
                            <Card chart>
                              <CardHeader color="success">
                                <img
                                  style={{ height: "200px", width: "100%", display: "block" }}
                                  src={require('assets/images/Egress_4_12-11-2020_20:45:22.jpg')}
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
                                  src={require('assets/images/Egress_4_12-11-2020_20:45:22.jpg')}
                                  alt='...'
                                />
                              </CardHeader>
                              <CardBody>
                                <h4 className={classes.cardTitle}>Salida de la bicicleta</h4>
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