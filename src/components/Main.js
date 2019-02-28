import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const Main = ({ children, classes }) => (
  <main className={classes.main}>
    {children}
  </main>
)

const styles = theme => ({
  main: {
    marginTop: theme.spacing.unit * 2
  }
});

export default withStyles(styles)(Main);
