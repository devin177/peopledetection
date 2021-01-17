import './App.css';
import Grid from '@material-ui/core/Grid';
import NavBar from './components/NavBar.js'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import React, { useState } from 'react'
import { Card, Box} from '@material-ui/core'
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  paper: {
    height: 400,
    width: 250,
	},
	// SHit don't work
	divider: {
		minHeight: 20
	}
}));

function App() {
	const [position, setPosition] = useState('Davis')
	const [shoppers, setShoppers] = useState(0);
	const [totalIn, setTotalIn] = useState(0);
	// const [totalOut, setTotalOut] = useState(0);

	// call all these state functions
	// Should be calls to api

	const classes = useStyles();

  return (
		<div className = "App" spacing={10}>
			<NavBar></NavBar>

			<div className="divider"></div>

			<Box height={100} padding={5}>
				<Typography variant='h3'>{position}</Typography>
			</Box>

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
