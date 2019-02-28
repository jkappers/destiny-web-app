import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Main from '../../components/Main';
import { login } from '../../services/auth';

class LoginView extends React.Component {
  state = {
    email: '',
    password: ''
  }

  onTextChanged = e => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  onButtonClicked = e => {
    const { email, password } = this.state;

    login(email, password)
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/books' } };
    const { isAuthenticated } = this.props;

    console.log('isAuthenaticated', isAuthenticated, this.props);

    if (isAuthenticated) {
      return <Redirect to={from} />;
    }

    return (
      <Fragment>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Destiny Builder
            </Typography>
          </Toolbar>
        </AppBar>        
        <Main>
          <Grid container justify="center">
            <Grid item xs={10} lg={8}>
              <TextField
                id="emailAddress"
                name="email"
                label="Email"
                value={this.state.email}
                margin="dense"
                variant="outlined"
                onChange={this.onTextChanged}
                fullWidth
              />
            </Grid>
            <Grid item xs={10} lg={8}>
              <TextField
                id="password"
                name="password"
                label="Password"
                value={this.state.password}
                margin="dense"
                variant="outlined"
                onChange={this.onTextChanged}
                type="password"
                fullWidth
              />   
            </Grid>
            <Grid item xs={10} lg={8}>
              <Toolbar disableGutters>
                <Button 
                  onClick={this.onButtonClicked}
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth>
                  Sign In
                </Button>
              </Toolbar>
            </Grid>
          </Grid>
        </Main>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.email
});

export default connect(
  mapStateToProps
)(LoginView);
