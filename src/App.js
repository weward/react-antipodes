import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Home from './Pages/Home'
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
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

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Edward's Antipodes
          </Typography>
          <Link href="https://bitbucket.org/rolandedwardsantos/react-antipodes/src/master/" target="_blank" color="inherit">Source</Link>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Home />
      </Container>
    
    </div>
  );
}

export default App;
