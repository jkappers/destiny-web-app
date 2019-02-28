import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
          <Button 
            onClick={this.onButtonClicked}
            variant="contained"
            color="primary"
            size="large"
            fullWidth>
            Sign In
          </Button>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.email
});

export default connect(
  mapStateToProps
)(LoginView);
