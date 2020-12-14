import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import DirectionsBike from '@material-ui/icons/DirectionsBike';
import MotorcycleOutlined from '@material-ui/icons/MotorcycleOutlined';
import ErrorIcon from '@material-ui/icons/Error';
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import Table from "components/Table/Table";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import CardFooter from "components/Card/CardFooter";
import DialogCustom from 'components/Dialog/DialogCustom';
import { format } from 'date-fns';
import axios from 'axios';
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Button from "components/CustomButtons/Button.js";
import ExportExcel from 'react-export-excel';
import { headerAuthorization } from "./../../variables/token";
import { APP_URL } from './../../variables/utils.js';

const ExcelFile = ExportExcel.ExcelFile;
const ExcelSheet = ExportExcel.ExcelSheet;
const ExcelColumn = ExportExcel.ExcelColumn;

const useStyles = makeStyles(styles);


export default function Dashboard() {

  const [data, setData] = useState([]);
  const classes = useStyles();
  const [arrivals] = useState([]);
  const [departures] = useState([]);
  const [suspectedCases] = useState([]);
  const [arrivalsItems] = useState([]);
  const [departuresItems] = useState([]);
  const [suspectedCasesItems] = useState([]);
  const [arrivalsIndex] = useState([]);
  const [departuresIndex] = useState([]);
  const [suspectedCasesIndex] = useState([]);
  const [arrivalSelected, setArrivalSelected] = useState({});
  const [departureSelected, setDepartureSelected] = useState({});
  const [suspectedCaseSelected, setSuspectCaseSelected] = useState({});

  const [checkedArrival, setCheckedArrival] = React.useState([]);
  const [checkedDeparture, setCheckedDeparture] = React.useState([]);
  const [checkedSuspectedCase, setCheckedSuspectedCase] = React.useState([]);

  const [newCheckedA, setNewCheckedA] = React.useState([]);
  const [newCheckedD, setNewCheckedD] = React.useState([]);
  const [newCheckedS, setNewCheckedS] = React.useState([]);

  const tableColumns = [" ","lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];

  const handleToggle = (value, checkedList, setChecked, tasks, setItemSelected, items, newChecked, setNewChecked) => {
    const currentIndex = checkedList.indexOf(value);
    setNewChecked([]);
    
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    setItemSelected(items[value]||{})
  };

  const findStaysFromToday = () => {
    axios
      .get(APP_URL + "estadias-getAll/", headerAuthorization())
      .then(res => res.data)
      .then((result) => {
          result.forEach((e) => {
            if (e.arrival.dateCreated) {
              arrivals.push(e.userName + ' estaciono en el lugar ' + e.placeUsed)
              arrivalsItems.push(e.arrival)
            }
            if (e.departure.dateCreated) {
              departures.push(e.userName + ' se retiro del lugar ' + e.placeUsed)
              departuresItems.push(e.departure)
            }
          })
          arrivals.forEach((item, key) => { arrivalsIndex.push(key); });
          departures.forEach((item, key) => { departuresIndex.push(key); });
        }, (error) => { console.log(error) })
      .catch((error) => { console.log(error) }) 
  }

  const findSuspectedCases = () => {
    axios
    .get(APP_URL + "notificationEgress-getAll/", headerAuthorization())
    .then(res => res.data)
    .then((result) => {
      result.forEach((e) => {
        suspectedCases.push('En el lugar ' + e.place +', dueño '+e.userName)
        suspectedCasesItems.push(e)
      })
      suspectedCases.forEach((item, key) => { suspectedCasesIndex.push(key); });
    })
    .catch((error) => { console.log(error) })
  }

  const [stadiaHabitual, setStadiaHabitual] = useState([]);
  const [days] = useState(14);

  const findEstadiasReportesAll = () => {
    axios
    .get(APP_URL + "estadia/reportsHourUserWeek/"+suspectedCaseSelected.userName+"/"+days+"/", headerAuthorization())
    .then(res => res.data)
    .then((result) => {
      setStadiaHabitual(result)
      loadUser()
      let values = result.map((item) => [item.modo, 
                                         item.lunes, 
                                         item.martes, 
                                         item.miercoles, 
                                         item.jueves,
                                         item.viernes,
                                         item.sabado])
      setData(values);
    })
    .catch((error) => { console.log(error) })
  }

  const formatDateCreated = (segment) => {
    return segment.dateCreated ? 'Generada: ' + format(new Date(segment.dateCreated), 'dd-MM-yyyy HH:mm:ss'):''
  }

  const [open, setOpen] = React.useState(false);
  
  const handleClose = () => {
    setOpen(false);
  };

  const loadUser = () => {
    setOpen(true);
  }

  const verUser=()=>{
    findEstadiasReportesAll()
  }
  
  useEffect(() => { 
    findStaysFromToday();
    findSuspectedCases();
  }, [1]);
  
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <img style={{ height: "180px", width: "100%", display: "block" }}
                 src={arrivalSelected ? arrivalSelected.imageBase64 : ''}
                 alt="..." />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Llegada</h4>
              <p className={classes.cardCategory}>
                {arrivals[checkedArrival[0]]}
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTimeIcon /> {formatDateCreated(arrivalSelected)}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
            <img
              style={{ height: "180px", width: "100%", display: "block" }}
              src={departureSelected ? departureSelected.imageBase64 : ''}
              alt='...'
            />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Salida</h4>
              <p className={classes.cardCategory}>{departures[checkedDeparture[0]]}</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTimeIcon /> {formatDateCreated(departureSelected)}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <img
                style={{ height: "180px", width: "100%", display: "block" }}
                src={suspectedCaseSelected ? suspectedCaseSelected.photoInBase64 : ''}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Posible Robo</h4>
              <p className={classes.cardCategory}>{suspectedCases[checkedSuspectedCase[0]]}</p>
              <Button disabled={suspectedCaseSelected && !suspectedCaseSelected.userName} color="danger" onClick={() => verUser()}> ver </Button>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTimeIcon /> {formatDateCreated(suspectedCaseSelected)}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Estadias:"
            headerColor="info"
            tabs={[
              {
                tabName: "Llegadas",
                tabIcon: MotorcycleOutlined ,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={arrivalsIndex}
                    tasks={arrivals}
                    onChangeRadio={handleToggle}
                    checked={checkedArrival}
                    setChecked={setCheckedArrival}
                    setItemSelected={setArrivalSelected}
                    items={arrivalsItems}
                    newChecked={newCheckedA}
                    setNewChecked={setNewCheckedA}
                  />
                )
              },
              {
                tabName: "Salidas",
                tabIcon: DirectionsBike,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={departuresIndex}
                    tasks={departures}
                    onChangeRadio={handleToggle}
                    checked={checkedDeparture}
                    setChecked={setCheckedDeparture}
                    setItemSelected={setDepartureSelected}
                    items={departuresItems}
                    newChecked={newCheckedD}
                    setNewChecked={setNewCheckedD}
                  />
                )
              }
            ]}
          />
        </GridItem>

        <GridItem xs={12} sm={12} md={6}>
        <CustomTabs
            title="Estadias:"
            headerColor="danger"
            tabs={[
              {
                tabName: "Posibles Robos",
                tabIcon: ErrorIcon ,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={suspectedCasesIndex}
                    tasks={suspectedCases}
                    onChangeRadio={handleToggle}
                    checked={checkedSuspectedCase}
                    setChecked={setCheckedSuspectedCase}
                    setItemSelected={setSuspectCaseSelected}
                    items={suspectedCasesItems}
                    newChecked={newCheckedS}
                    setNewChecked={setNewCheckedS}
                  />
                )
              }
            ]}
        />
        </GridItem>
      </GridContainer>

      <GridContainer>
        <DialogCustom titleDialog={"Egreso sospechoso en el lugar: " + suspectedCaseSelected.place} 
                      dialogContentText={"Ver horarios de ingresos y egresos habituales del usuario: " + suspectedCaseSelected.userName}
                      isOpen={open} closeFunction={handleClose} isEditionDialog={false}
                      componentContent={<>
                        <GridItem xs={20} sm={20} md={20}>
                          <Card>
                            <CardHeader color="info">
                              <h4 className={classes.cardTitleWhite}>Horarios habituales</h4>
                            </CardHeader>
                            <CardBody>
                              <Table
                                tableHeaderColor="info"
                                tableHead={tableColumns}
                                tableData={data}
                              />
                              <ExcelFile element={<Button>Exportar a excel</Button>} filename="Caso sospechoso">
                                <ExcelSheet data={stadiaHabitual} name="Horarios habituales">
                                  <ExcelColumn label=" " value="modo"/>
                                  <ExcelColumn label="lunes" value="lunes"/>
                                  <ExcelColumn label="martes" value="martes"/>
                                  <ExcelColumn label="miercoles" value="miercoles"/>
                                  <ExcelColumn label="jueves" value="jueves"/>
                                  <ExcelColumn label="viernes" value="viernes"/>
                                  <ExcelColumn label="sabado" value="sabado"/>
                                </ExcelSheet>  
                              </ExcelFile>
                            </CardBody>
                          </Card>
                        </GridItem>
                      </>}>
        </DialogCustom>
      </GridContainer>
    </div>
  );
}