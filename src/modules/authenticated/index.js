import React, { Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import IconedButton from '../../components/IconedButton';
import { logout } from '../../services/auth';

const AuthenticatedLayoutView = ({ 
  isAuthenticated, children, location, classes
}) => {
  if (!isAuthenticated) {
    return (
      <Redirect to={{
          pathname: '/login',
          state: { from: location }
        }}
      />
    )
  }

  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Destiny Builder
          </Typography>
          <IconedButton
            component={Link}
            to={'/books'}
            icon={<Icon>collections_bookmark</Icon>}
            color="inherit">
            Books
          </IconedButton>
          <IconButton color="inherit" onClick={logout}>
            <Icon>power_settings_new</Icon>
          </IconButton>
        </Toolbar>
      </AppBar>
      {children}
    </Fragment>
  );
}

const styles = theme => ({
  grow: {
    flexGrow: 1
  }
})

const StyledAuthenticatedLayoutView = withStyles(styles)(AuthenticatedLayoutView);

const mapStateToProps = state => ({
  isAuthenticated: state.auth.email
})

export default connect(
  mapStateToProps,
  null
)(StyledAuthenticatedLayoutView);