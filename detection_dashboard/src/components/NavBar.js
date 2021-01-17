import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import background from '../img/corona.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    margin: 50
  },
}));

export default function NavBar() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            {/*Could put an ICON here. Like an eyeball*/}
            <Typography variant="h2" className={classes.title}>
              Crowd Size Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
}
