import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const IconedButton = ({ icon, children, classes, ...rest }) => (
  <Button {...rest}>
    <span className={classes.icon}>
      {icon}
    </span>
    {children}
  </Button>
)

const styles = theme => ({
  icon: {
    display: 'inherit',
    marginRight: theme.spacing.unit / 2
  }
});

export default withStyles(styles)(IconedButton);