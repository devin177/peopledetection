import React, { useState, useEffect } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Box, Typography, Grid, Card, Paper } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import 'bootstrap/dist/css/bootstrap.min.css';

const useStyles = makeStyles((theme) => ({
  paper: {
    height: 400,
    width: 250,
	}
}));

function Menu() {
  const [allLocations, setAllLocations] = useState([]);
  const [position, setPosition] = useState('Davis');
  const [numPeople, setNumPeople] = useState(0);
  const [maxcap, setMaxCap] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    fetch('https://95e4xx7ty1.execute-api.us-west-1.amazonaws.com/hackdavis/livedata?type=dropdown', {
      method: "GET",
      mode: 'cors'
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      setAllLocations(data);
    })
  }, []);

  function menuHandler(e) {
    setPosition(e)
    console.log(e);
    // api request to get the data for this location
    updateData(e);
  };

  function updateData(place) {
    fetch(`https://95e4xx7ty1.execute-api.us-west-1.amazonaws.com/hackdavis/livedata?type=${place}`, 
      {
        method: "GET",
        mode: "cors"
      })
      .then((response) => {return response.json()})
      .then((data) => {
        console.log(data);
        setNumPeople(data.curcapacity);
        setMaxCap(data.maxcapacity);
      })
  }

  return(
    <div>
      <div>
        <Box height={100} padding={5}>
          <Typography variant='h3'>{position}</Typography>
        </Box>

        <Dropdown onSelect={menuHandler}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Choose a Location
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {allLocations.map(currentLoc => (
              <Dropdown.Item eventKey={currentLoc} key={currentLoc}>{currentLoc}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <Grid container justify="center" spacing={5}>
        <Grid item>
          <Paper className={classes.paper}>
						<Card padding={20}>
							<CardContent>
								<Typography>
									Current Number of People
								</Typography>
							</CardContent>
						</Card>
						<Typography variant='h1'>
							{numPeople}
						</Typography>
					</Paper>
        </Grid>

				<Grid item>
          <Paper className={classes.paper}>
					<Card>
							<CardContent>
								<Typography>
									Max Capacity
								</Typography>
							</CardContent>
						</Card>
						<Typography variant='h1'>
							{maxcap}
						</Typography>
					</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Menu;
