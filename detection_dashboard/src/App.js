import './App.css';
import Grid from '@material-ui/core/Grid';
import NavBar from './components/NavBar.js';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import React, { useState, useEffect } from 'react'
import { Card, Box} from '@material-ui/core'
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './components/Menu.js';

const useStyles = makeStyles((theme) => ({
  paper: {
    height: 400,
    width: 250,
	},
	// Shit don't work
	divider: {
		minHeight: 20
	}
}));

function App() {
	// list of all locations
	const [shoppers, setShoppers] = useState(0);
	const [totalIn, setTotalIn] = useState(0);
	// const [totalOut, setTotalOut] = useState(0);

	// call all these state functions
	// Should be calls to api
	/*useEffect(() => {
		// go get data from db
		fetch('https://95e4xx7ty1.execute-api.us-west-1.amazonaws.com/hackdavis/livedata')
			.then(response => {
				for (let i = 0; i < response.body.length; ++i) {
					// put stuff into the react state array
					setAllLocations(allLocations.concat(response.body[i]));
				}
			})
	});*/
	// set the numbers

	const classes = useStyles();

  return (
		<div className = "App" spacing={10}>
			<NavBar></NavBar>

			<div className="divider"></div>

			<Menu></Menu>

			<Grid container justify="center" spacing={5}>
        <Grid item>
          <Paper className={classes.paper}>
						<Card padding={20}>
							<CardContent>
								<Typography>
									Current Shoppers
								</Typography>
							</CardContent>
						</Card>
						<Typography variant='h1'>
							{shoppers}
						</Typography>
					</Paper>
        </Grid>

				<Grid item>
          <Paper className={classes.paper}>
					<Card>
							<CardContent>
								<Typography>
									Daily Total
								</Typography>
							</CardContent>
						</Card>
						<Typography variant='h1'>
							{totalIn}
						</Typography>
					</Paper>
        </Grid>

				{/*<Grid item>
          <Paper className={classes.paper}>
					<Card>
							<CardContent>
								<Typography>
									Total Mask
								</Typography>
								<Typography>
									object
								</Typography>
							</CardContent>
						</Card>
					</Paper>
        </Grid>*/}
      </Grid>
		</div>
  );
}

export default App;
