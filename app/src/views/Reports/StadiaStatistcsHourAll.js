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
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { headerAuthorization } from "./../../variables/token";
import { APP_URL } from './../../variables/utils.js';

const useStyles = makeStyles(styles);
export default function StadiaStatistcsHourAll() {
  
  const [stadiaHabitual, setStadiaHabitual] = useState({});
  const classes = useStyles();

  const [days, setDays] = useState(7);
  const handleChange = (event) => {
    setDays(event.target.value);
  };

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
    .get(APP_URL + "estadia/reportsHourAllWeek/"+days+"/", headerAuthorization())
    .then(res => res.data)
    .then((result) => {
      console.log(result)
      setStadiaHabitual(result)
    })
    .catch((error) => { console.log(error) })
  }

  useEffect(() => { 
    findEstadiasReportesAll();
  }, [days]);

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
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Semanas</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={days}
                        onChange={handleChange}
                      >
                      <MenuItem value={7}>última semana</MenuItem>
                      <MenuItem value={14}>últimas dos semanas</MenuItem>
                      <MenuItem value={21}>últimas tres semanas</MenuItem>
                      <MenuItem value={28}>últimas cuatro semanas</MenuItem>
                    </Select>
                  </FormControl>
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