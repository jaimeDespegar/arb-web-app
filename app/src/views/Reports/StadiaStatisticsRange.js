import React, { useEffect, useState } from "react";
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  makeStyles,
  colors
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import axios from 'axios';
import { headerAuthorization } from "./../../variables/token";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { APP_URL } from './../../variables/utils.js';
import { Chart } from "react-google-charts";


const useStyles = makeStyles(() => ({
  root: {}
}));

const StadiaStatisticsRange = ({ className, ...rest }) => {

  const classes = useStyles();
  const theme = useTheme();
  const [stadiaRange, setStadiaRange] = useState({});
  
  const [days, setDays] = useState(7);
  const handleChange = (event) => {
    setDays(event.target.value);
  };

  const findEstadiasReportesAll = () => {
    axios
    .get(APP_URL + "estadia/reportsRange/"+days+"/", headerAuthorization())
    .then(res => res.data)
    .then((result) => {
      console.log(result);
      setStadiaRange(result); 
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
          <MenuItem value={1}>uno</MenuItem>
          <MenuItem value={2}>dos</MenuItem>
          <MenuItem value={3}>tres</MenuItem>
          <MenuItem value={4}>cuatro</MenuItem>
          <MenuItem value={5}>cinco</MenuItem>
          <MenuItem value={6}>seis</MenuItem>
          <MenuItem value={7}>siete</MenuItem>
          <MenuItem value={8}>ocho</MenuItem>
          <MenuItem value={9}>nueve</MenuItem>
          <MenuItem value={10}>diez</MenuItem>
          <MenuItem value={11}>once</MenuItem>
          <MenuItem value={12}>doce</MenuItem>
          <MenuItem value={13}>trece</MenuItem>
          <MenuItem value={14}>catorce</MenuItem>
        </Select>
      </FormControl>
      <CardHeader
        title="Estadísticas de estadías semanal"
      />
      <Divider />
      <CardContent>
        
         {stadiaRange.length  && (<Chart
            width={'550px'}
            height={'350px'}
            chartType="Bar"
            loader={<div>Loading Chart</div>}
            data={stadiaRange}
            options={{
              chart: {
                title: '',
                subtitle: 'Estadías por turnos',
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
                    label: 'Cantidad Ingresos:',
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
                    label: 'Cantidad Egresos:',
                    allowTyping: false,
                    allowMultiple: false,
                  },
                },
              }
            ]}
          />)}
      </CardContent>
      <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
      </Box>
    </Card>
  );
};

StadiaStatisticsRange.propTypes = {
  className: PropTypes.string
};

export default StadiaStatisticsRange;