import React, { useEffect , useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Paper from "@material-ui/core/Paper";
import DirectionsBike from '@material-ui/icons/DirectionsBike';

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
  const [spacing, setSpacing] = React.useState(1);
  const [parkings, setParkings] = React.useState([]);

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };
  //

  const findBicycleParkings = () => {
      fetch("http://127.0.0.1:8000/api/bicycleParkingAndPlaces/")
      .then(res => res.json())
      .then((result) => {
          console.log(result);
          setParkings(result);
        },
        (error) => { console.log(error) }
      )
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
                           children={place.occupied ? <div><DirectionsBike fontSize='large'/></div> : ''}
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