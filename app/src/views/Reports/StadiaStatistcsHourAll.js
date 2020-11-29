import React, { useEffect , useState} from "react";
import ChartistGraph from "react-chartist";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { dailySalesChart } from "variables/charts.js";
import axios from 'axios';
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { Dropdown, DropdownItem, DropdownMenu } from 'reactstrap'
const useStyles = makeStyles(styles);


export default function StadiaStatistcsHourAll() {
  
  const [stadiaHabitual, setStadiaHabitual] = useState({});
  const classes = useStyles();
  const [days, setDays] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

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

  const actionWeek = (days)=>{
    console.log("semana " + days);
    setDays(days)
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
                      <DropdownMenu>
                          <DropdownItem onClick={()=>actionWeek(7)}>1 Semana</DropdownItem>
                          <DropdownItem onClick={()=>actionWeek(14)}>2 Semana</DropdownItem>
                          <DropdownItem onClick={()=>actionWeek(21)}>3 Semana</DropdownItem>
                          <DropdownItem onClick={()=>actionWeek(28)}>4 Semana</DropdownItem>
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