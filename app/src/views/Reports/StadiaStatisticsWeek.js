import React, { useEffect, useState } from "react";
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import {
  Box,
  Button,
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

const useStyles = makeStyles(() => ({
  root: {}
}));

const StadiaStatisticsWeek = ({ className, ...rest }) => {

  const classes = useStyles();
  const theme = useTheme();
  const [suspected, setSuspected] = useState({});

  const [days, setDays] = useState(7);
  const handleChange = (event) => {
    setDays(event.target.value);
  };


  const findEstadiasReportesAll = () => {
    axios
    .get("http://127.0.0.1:8000/api/estadia/reportsWeek/"+days+"/", headerAuthorization())
    .then(res => res.data)
    .then((result) => {
      console.log(result)
      setSuspected(result)
    })
    .catch((error) => { console.log(error) })
  }

  const data = {
    datasets: [
      {
        backgroundColor: colors.indigo[500],
        //data: [18, 5, 19, 27, 29, 19, 20], //'listaOk': [0, 0, 0, 0, 0, 0, 0]
        data: suspected.listaOk,
        label: 'Exitosas'
      },
      {
        backgroundColor: colors.red[200],
        //data: [11, 20, 12, 29, 30, 25, 13],
        data: suspected.listaSospechosas,//'listaSospechosas': [0, 1, 1, 0, 0, 0, 0]
        label: 'Sospechosas'
      }
    ],
    //labels: ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug']
    labels: suspected.listaFechas
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

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
        <Box
          height={400}
          position="relative"
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          Overview
        </Button>
      </Box>
    </Card>
  );
};

StadiaStatisticsWeek.propTypes = {
  className: PropTypes.string
};

export default StadiaStatisticsWeek;