import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


class MultiSelect extends Component {
  render() {
    return (
        <Card>
          <CardActionArea>
            <CardContent>
              <Typography component="p">Hello </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
    );
  }
}

export default MultiSelect;

// value={this.state.age}
// onChange={this.handleChange}
// inputProps={{
//   name: 'age',
//   id: 'age-simple',
// }}