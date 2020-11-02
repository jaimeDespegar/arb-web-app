import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import Paper from "@material-ui/core/Paper";
import DirectionsBike from '@material-ui/icons/DirectionsBike';
import PlaceIcon from '@material-ui/icons/Place';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom:25
  },
  paper: {
    height: 80,
    width: 90,
    backgroundColor: "#ef5350",//"#66bb6a"
    display: 'flex',
    justifyContent:'center',
    alignItems: 'center'
  },
  control: {
    padding: theme.spacing(2)
  }
}));

export default function BicycleParkings() {
  
  const classes = useStyles();
  const [spacing] = React.useState(1);
  const [parkings, setParkings] = React.useState([]);

  const findBicycleParkings = () => {
    const token = axios.defaults.headers.common.Authorization
    console.log('header ', token)

    if (token) {
      const data = {
        headers: {
          "Authorization": axios.defaults.headers.common.Authorization
        }
      } 
      // 9a161d73f4895ecc8f86b4922f989852ea238e02
  
      axios
        .get("http://127.0.0.1:8000/api/bicycleParkingAndPlaces/")
        .then(res => res.data)
        .then((result) => {
            console.log(result);
            setParkings(result);
          }
        )
        .catch((error) => { console.log('Error bicycly parkings ', error) })  
    } else {
      console.log('BicycleParking: no hay token')
    }
    
    
    
  }
  
  useEffect(() => { findBicycleParkings() }, [])

  return (
    <div>
      <GridContainer>
        {(!parkings.length) ? 
          (<Grid item xs={12}>
             <Paper className={classes.control}>
               <Grid container>
                 <Grid item>
                   <FormLabel>No hay bicicleteros registrados.</FormLabel>
                 </Grid>
               </Grid>
             </Paper>
          </Grid>) : ''
        }

        {parkings.map((parking) => (
          <Grid container className={classes.root} spacing={2}>      
             
            <Grid item xs={12}>
              <Grid container justify="center" spacing={spacing}>
                {parking.places.length ? (parking.places.map((place) => (
                  <Grid key={place.placeNumber} item>
                    <Paper elevation={8} className={classes.paper} 
                           children={place.occupied ? <div><DirectionsBike fontSize='large'/></div> : <div><PlaceIcon fontSize='large'/></div>}
                           style={{'backgroundColor': place.occupied ? '#ef5350':'#66bb6a'}}/>
                  </Grid> 
                ))): (<></>)}
              </Grid>
            </Grid>
           <Grid item xs={12}>
             <Paper className={classes.control}>
               <Grid container>
                 <Grid item>
                   <FormLabel>{parking.description}</FormLabel>
                 </Grid>
               </Grid>
             </Paper>
           </Grid>
         </Grid>          
        ))} 

      </GridContainer>
    </div>
  );
}