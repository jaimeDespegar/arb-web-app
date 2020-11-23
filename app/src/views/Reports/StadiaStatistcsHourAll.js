import React, { useEffect , useState} from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Grid from '@material-ui/core/Grid';
import CustomInput from "components/CustomInput/CustomInput";
import {
  dailySalesChart,
  completedTasksChart
} from "variables/charts.js";
import axios from 'axios';

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

//import 'bootstrap/dist/css/bootstrap.in.css'
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap'
const useStyles = makeStyles(styles);



export default function StadiaStatistcsHourAll() {
  
  const token = axios.defaults.headers.common.Authorization
  const [stadiaHabitual, setStadiaHabitual] = useState({});

  let datalocalEntrance = {
    data: {
      labels: stadiaHabitual.listDaysWeek,
      series: stadiaHabitual.listEntrance
    }
  };
  let datalocalEgress = {
    data: {
      labels: stadiaHabitual.listDaysWeek,
      series: stadiaHabitual.listEgress
    }
  };
  const findEstadiasReportesAll = () => {
    axios
    .get("http://127.0.0.1:8000/api/estadia/reportsHourAllWeek/"+days+"/")
    .then(res => res.data)
    .then((result) => {
      console.log(result)
      setStadiaHabitual(result)
    })
    .catch((error) => { console.log(error) })
  }
  

  const classes = useStyles();
  const [days, setDays] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const accionSemana1=()=>{
    alert("semana 1");
    setDays(7)
    findEstadiasReportesAll()
  }
  const accionSemana2=()=>{
    alert("semana 2");
    setDays(14)
    findEstadiasReportesAll()
  }
  const accionSemana3=()=>{
    alert("semana 3");
    setDays(21)
    findEstadiasReportesAll()
  }
  const accionSemana4=()=>{
    alert("semana 4");
    setDays(28)
    findEstadiasReportesAll()
  }
  useEffect(() => { 
    findEstadiasReportesAll();
  }, []);
  return (
    <div>
      
      <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="success">
              <h4 className={classes.cardTitleWhite}>Elija una semana para ver sus estadias habituales</h4>
            </CardHeader>
            <CardBody>
              <GridContainer >
                <GridItem xs={15} sm={15} md={12} >
                    <Dropdown isOpen={dropdownOpen} toggle={toggle} >
                      {/* <DropdownToggle caret>
                        Elija una de las siguientes opciones:
                      </DropdownToggle> */}
                        <DropdownMenu>
                          <DropdownItem onClick={()=>accionSemana1()}>1 Semana</DropdownItem>
                          <DropdownItem onClick={()=>accionSemana2()}>2 Semana</DropdownItem>
                          <DropdownItem onClick={()=>accionSemana3()}>3 Semana</DropdownItem>
                          <DropdownItem onClick={()=>accionSemana4()}>4 Semana</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
      </GridItem>

      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="info">
              <ChartistGraph
                className="ct-chart"
                data={datalocalEntrance.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Ingresos habituales</h4>
            </CardBody>
          </Card>
        </GridItem>
        
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="primary">
              <ChartistGraph
                className="ct-chart"
                data={datalocalEgress.data}
                type="Line"
                // options={completedTasksChart.options}
                // listener={completedTasksChart.animation}
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Egresos habituales</h4>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
  
    </div>
  );
}