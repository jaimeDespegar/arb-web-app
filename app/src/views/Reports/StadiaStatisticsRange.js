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
import { APP_URL } from './../../variables/utils.js';


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
      console.log(result)
      setStadiaRange(result)
    })
    .catch((error) => { console.log(error) })
  }

  const data = {
    datasets: [
      {
        backgroundColor: colors.indigo[500],
        data: stadiaRange.listEntrance,
        label: 'Ingresos'
      },
      {
        backgroundColor: colors.red[200],
        data: stadiaRange.listEgress,
        label: 'Egresos'
      }
    ],
    labels: stadiaRange.listLastDaysWeek
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

StadiaStatisticsRange.propTypes = {
  className: PropTypes.string
};

export default StadiaStatisticsRange;