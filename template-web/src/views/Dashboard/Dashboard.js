import React, { useEffect, useState } from "react";
import ChartistGraph from "react-chartist";
import { makeStyles } from "@material-ui/core/styles";
import AccessTime from "@material-ui/icons/AccessTime";
import DirectionsBike from '@material-ui/icons/DirectionsBike';
import MotorcycleOutlined from '@material-ui/icons/MotorcycleOutlined';
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import Table from "components/Table/Table";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import CardFooter from "components/Card/CardFooter";
import { completedTasksChart } from "variables/charts.js";
import { format } from 'date-fns'

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);


export default function Dashboard() {

  const classes = useStyles();
  //const [stays, setStays] = useState([]);
  const [arrivals] = useState([]);
  const [departures] = useState([]);
  const [arrivalsItems] = useState([]);
  const [departuresItems] = useState([]);
  const [arrivalsIndex] = useState([]);
  const [departuresIndex] = useState([]);
  const [arrivalSelected, setArrivalSelected] = useState({});
  const [departureSelected, setDepartureSelected] = useState({});

  const [checkedArrival, setCheckedArrival] = React.useState([0]);
  const [checkedDeparture, setCheckedDeparture] = React.useState([0]);

  const [newChecked, setNewChecked] = React.useState([]);

  const handleToggle = (value, checkedList, setChecked, tasks, setItemSelected, items) => {
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
    fetch("http://127.0.0.1:8000/api/estadias/")
    .then(res => res.json())
    .then((result) => {
        console.log(result);
        //setStays(result);
        result.forEach((e) => {
          if (e.arrival.dateCreated) {
            arrivals.push(e.userName + ' estaciono en el lugar ' + e.placeUsed)
            arrivalsItems.push(e.arrival)
          }
          if (e.departure.dateCreated) {
            departures.push(e.userName + ' se retiro del lugar ' + e.placeUsed)
            departuresItems.push(e.departure)
            departures.push(e.userName + ' se retiro del lugar ' + e.placeUsed)
            departuresItems.push(e.departure)
          }
        })
        arrivals.forEach((item, key) => { arrivalsIndex.push(key); });
        departures.forEach((item, key) => { departuresIndex.push(key); });
      },
      (error) => { console.log(error) })    
  }

  const formatDateCreated = (segment) => {
    return segment.dateCreated ? 'Generada: ' + format(new Date(segment.dateCreated), 'dd-MM-yyyy HH:mm:ss'):''
  }

  useEffect(() => { 
    findStaysFromToday() 
    console.log("arrivals ", arrivalsItems)
    console.log("departures ", departuresItems)
    setArrivalSelected(arrivalsItems[0] || {})
    setDepartureSelected(departuresItems[0] || {})
  }, []);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
            <img
              style={{ height: "180px", width: "100%", display: "block" }}
              src={arrivalSelected.photo}
            />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Llegada</h4>
              <p className={classes.cardCategory}>
                {arrivals[checkedArrival[0]]}
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> {formatDateCreated(arrivalSelected)}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
            <img
              style={{ height: "180px", width: "100%", display: "block" }}
              src={departureSelected.photo}
            />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Salida</h4>
              <p className={classes.cardCategory}>{departures[checkedDeparture[0]]}</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> {formatDateCreated(departureSelected)}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
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
                  />
                )
              }
            ]}
          />
        </GridItem>

        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="danger">
              <h4 className={classes.cardTitleWhite}>Casos Sospechosos</h4>
              <p className={classes.cardCategoryWhite}>
                Posibles casos de robo
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="danger"
                tableHead={["ID", "Name", "Salary", "Country"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Niger"]
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
