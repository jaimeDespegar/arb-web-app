import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import DateRangeIcon from '@material-ui/icons/DateRange';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ViewWeekIcon from '@material-ui/icons/ViewWeek';
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import Reports from "views/Reports/StadiaStatistics.js"
import ReportsWeek from 'views/Reports/StadiaStatisticsWeek.js';
import ReportsRange from 'views/Reports/StadiaStatisticsRange.js';
import ReportsAllHour from 'views/Reports/StadiaStatistcsHourAll.js';
import ReportsAllSuspectedAndPeakTimeAll from 'views/Reports/StadiaStatistcsSuspectedAndPeakTimeAll.js';

const useStyles = makeStyles({
  root: {
    width: '90%',
  },
});

export default function LabelBottomNavigation() {

  const classes = useStyles();
  const [value, setValue] = React.useState('Estadías');
  const [stayStatistics, setStayStatistics] = React.useState(true);
  const [reportsWeek, setReportsWeek] = React.useState(false);
  const [reportsRange, setReportsRange] = React.useState(false);
  const [reportsAllHour, setReportsAllHour] = React.useState(false);
  const [reportsAllSuspectedAndPeakTimeAll, setReportsAllSuspectedAndPeakTimeAll] = React.useState(false);


  const handleChange = (event, newValue) => {
    setValue(newValue);
    setStayStatistics(newValue === 'stayStatistics');
    setReportsWeek(newValue === 'Recents');
    setReportsRange(newValue === 'Favorites');
    setReportsAllHour(newValue === 'Nearby');
    setReportsAllSuspectedAndPeakTimeAll(newValue === 'Folder');
  };

  return (
    <>
    <BottomNavigation value={value} onChange={handleChange} showLabels className={classes.root}>
      <BottomNavigationAction label="Estadías" value='stayStatistics' icon={<AssessmentIcon />} />
      <BottomNavigationAction label="Estadías por fechas" value='Recents' icon={<AssessmentIcon />} />
      <BottomNavigationAction label="Ingresos/Egresos" value='Favorites'  icon={<AssessmentIcon />} />
      <BottomNavigationAction label="Habituales" value='Nearby' icon={<ViewWeekIcon />} />
      <BottomNavigationAction label="Concurrencia/Robos" value='Folder' icon={<DateRangeIcon />} />
    </BottomNavigation>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12} style={{ marginTop: 20 }}>
        {stayStatistics && (<Reports />)}
        {reportsWeek && (<ReportsWeek />)}
        {reportsRange && (<ReportsRange />)}
        {reportsAllHour && (<ReportsAllHour />)}
        {reportsAllSuspectedAndPeakTimeAll && (<ReportsAllSuspectedAndPeakTimeAll />)}
      </GridItem>
    </GridContainer>
    </>
  );
}