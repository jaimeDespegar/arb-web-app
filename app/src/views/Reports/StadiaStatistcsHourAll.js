import React, { useEffect , useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import axios from 'axios';
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { headerAuthorization } from "./../../variables/token";
import { APP_URL } from './../../variables/utils.js';
import { Chart } from "react-google-charts";


const useStyles = makeStyles(styles);
export default function StadiaStatistcsHourAll() {
  
  const [stadiaHabitual, setStadiaHabitual] = useState({});
  const classes = useStyles();

  const [days, setDays] = useState(7);
  const handleChange = (event) => {
    setDays(event.target.value);
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
        <GridItem xs={12} sm={12} md={12}>
          <Card chart>
            <CardHeader color="info">
              {stadiaHabitual && stadiaHabitual.entrances && stadiaHabitual.entrances.length && (
                <Chart
                width={'600px'}
                height={'400px'}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={stadiaHabitual.entrances}
                options={{
                  hAxis: {
                    title: 'Día de la semana',
                  },
                  vAxis: {
                    title: 'Horario',
                  },
                }}
                rootProps={{ 'data-testid': '1' }}
                chartPackages={['corechart', 'controls']}
                render={({ renderControl, renderChart }) => {
                    return (
                      <div style={{ display: 'flex' }}>
                        <div style={{ width: '40%' , marginRight: '100px'}}>{renderControl(() => true)}</div>
                        <div style={{ width: '60%' }}>{renderChart()}</div>
                      </div>
                    )
                  }}
                controls={[
                  {
                    controlType: 'NumberRangeFilter',
                    controlID: 'entrances-filter',
                    options: {
                      filterColumnIndex: 1,
                      ui: {
                        labelStacking: 'vertical',
                        label: 'Rango de horarios:',
                        allowTyping: false,
                        allowMultiple: false,
                      },
                    },
                  }
                ]}
              />)}
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Ingresos habituales</h4>
            </CardBody>
          </Card>
        </GridItem>
        
        <GridItem xs={12} sm={12} md={12}>
          <Card chart>
            <CardHeader color="primary">
              {stadiaHabitual && stadiaHabitual.egress && stadiaHabitual.egress.length && (
                <Chart
                width={'600px'}
                height={'400px'}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={stadiaHabitual.egress}
                options={{
                  hAxis: {
                    title: 'Día de la semana',
                  },
                  vAxis: {
                    title: 'Horario',
                  },
                }}
                rootProps={{ 'data-testid': '2' }}
                chartPackages={['corechart', 'controls']}
                render={({ renderControl, renderChart }) => {
                    return (
                      <div style={{ display: 'flex' }}>
                        <div style={{ width: '40%' , marginRight: '100px'}}>{renderControl(() => true)}</div>
                        <div style={{ width: '60%' }}>{renderChart()}</div>
                      </div>
                    )
                  }}
                controls={[
                  {
                    controlType: 'NumberRangeFilter',
                    controlID: 'egress-filter',
                    options: {
                      filterColumnIndex: 1,
                      ui: {
                        labelStacking: 'vertical',
                        label: 'Rango de horarios:',
                        allowTyping: false,
                        allowMultiple: false,
                        color: 'red'
                      },
                    },
                  }
                ]}
              />)}
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