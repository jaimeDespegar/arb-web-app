import React, { useEffect, useState } from "react";
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  useTheme
} from '@material-ui/core';

import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import axios from 'axios';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const StadiaStatistics = ({ className, ...rest }) => {

  const classes = useStyles();
  const theme = useTheme();
  const [suspected, setSuspected] = useState({});

  const findEstadiasReportesAll = () => {
    axios
    .get("http://127.0.0.1:8000/api/estadia/reports/")
    .then(res => res.data)
    .then((result) => {
      console.log(result)
      setSuspected(result)
    })
    .catch((error) => { console.log(error) })
  }
  const EXITOSAS = suspected.Ok
  const SOSPECHOSAS = suspected.Sospechosas

  const data = {
    datasets: [
      {
        data: [EXITOSAS,SOSPECHOSAS],
        backgroundColor: [
          colors.indigo[500],
          colors.red[600]
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['Exitosas', 'Sospechosas']
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
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

  const devices = [
    {
      title: 'Exitosas',
      value: EXITOSAS,
      icon: HowToRegIcon,
      color: colors.indigo[500]
    },
    {
      title: 'Sospechosas',
      value: SOSPECHOSAS,
      icon: ImageSearchIcon,
      color: colors.red[600]
    }
  ];

  useEffect(() => { 
    findEstadiasReportesAll();
  }, []);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Estadísticas de estadías" />
      <Divider />
      <CardContent>
        <Box
          height={300}
          position="relative"
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          mt={2}
        >
          {devices.map(({
            color,
            icon: Icon,
            title,
            value
          }) => (
            <Box
              key={title}
              p={1}
              textAlign="center"
            >
              <Icon color="action" />
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h2"
              >
                {value}
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

StadiaStatistics.propTypes = {
  className: PropTypes.string
};

export default StadiaStatistics;