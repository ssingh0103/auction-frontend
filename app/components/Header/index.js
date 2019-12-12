import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import GoogleLogin from 'react-google-login';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar({loggedIn,authenticated}) {
  const classes = useStyles();
  console.log(authenticated)
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Timer:
          </Typography>
          {!authenticated && <GoogleLogin
            clientId="59367628704-8i9re8sgggkpn7rkbfrtvgbou43g69b2.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={res => loggedIn(res)}
            onFailure={err => console.log(err)}
            cookiePolicy="single_host_origin"
          />}
        </Toolbar>
      </AppBar>
    </div>
  );
}
