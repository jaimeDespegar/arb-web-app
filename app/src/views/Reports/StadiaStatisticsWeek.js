import React, { useEffect, useState } from "react";
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  makeStyles
} from '@material-ui/core';
import axios from 'axios';
import { headerAuthorization } from "./../../variables/token";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { APP_URL } from './../../variables/utils.js';
import { Chart } from "react-google-charts";


const useStyles = makeStyles(() => ({
  root: {},
}));

const StadiaStatisticsWeek = ({ className, ...rest }) => {

  const classes = useStyles();
  const [suspected, setSuspected] = useState({});

  const [days, setDays] = useState(7);
  const handleChange = (event) => {
    setDays(event.target.value);
  };


  const findEstadiasReportesAll = () => {
    axios
    .get(APP_URL + "estadia/reportsWeek/"+days+"/", headerAuthorization())
    .then(res => res.data)
    .then((result) => {
      console.log(result)
      setSuspected(result)
    })
    .catch((error) => { console.log(error) })
  }

  
  useEffect(() => { 
    findEstadiasReportesAll();
  }, [days]);

  return (  
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Días</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={days}
          onChange={handleChange}
        >
          <MenuItem value={1}>último día</MenuItem>
          <MenuItem value={7}>última semana</MenuItem>
          <MenuItem value={30}>último mes</MenuItem>
          <MenuItem value={360}>último año</MenuItem>
        </Select>
      </FormControl>
      <CardHeader
        
        title="Estadísticas de estadías"
      />
      <Divider />
      <CardContent>

        {suspected.length && (<Chart
          width={'550px'}
          height={'350px'}
          chartType="Bar"
          loader={<div>Loading Chart</div>}
          data={suspected}
          options={{
            chart: {
              title: '',
              subtitle: 'Estadías',
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
              controlID: 'suspected-filter',
              options: {
                filterColumnIndex: 1,
                ui: {
                  labelStacking: 'vertical',
                  label: 'Cantidad exitosas:',
                  allowTyping: false,
                  allowMultiple: false,
                },
              },
            },
            {
              controlType: 'NumberRangeFilter',
              controlID: 'ok-filter',
              options: {
                filterColumnIndex: 2,
                ui: {
                  labelStacking: 'vertical',
                  label: 'Cantidad sospechosas:',
                  allowTyping: false,
                  allowMultiple: false,
                },
              },
            }
          ]}
        />)}
      </CardContent>
      <Divider />
    </Card>
  );
};

StadiaStatisticsWeek.propTypes = {
  className: PropTypes.string
};

export default StadiaStatisticsWeek;