import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SearchTextField from '../../../components/SearchTextField';


class AddChoiceDialog extends Component {

  handleSubmit = () => {}
  
  handleInputChanged = ({ currentTarget: { name, value } }) =>
    this.setState({ [name]: value });

  render = () => (
    <Dialog
      fullScreen
      open={this.props.open}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={this.props.classes.grow}>
            Create a Choice
          </Typography>
          <IconButton color="inherit" onClick={this.props.onClose} aria-label="Close">
            <Icon>close</Icon>
          </IconButton>
        </Toolbar>
      </AppBar>
      <AppBar color="default" position="static">
        <Toolbar>
          <SearchTextField placeholder="Search for a page..." />
        </Toolbar>
      </AppBar>       
      <List>
        <ListSubheader>To which page will this choice connect?</ListSubheader>
        {[1,2,3].map(page => (
          <ListItem key={page.id} button divider>
            <ListItemText primary={"This is some content"} />
            <ListItemIcon>
              <Icon>chevron_right</Icon>
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
    </Dialog>        
  )
}

const styles = theme => ({
  grow: {
    flexGrow: 1
  }
})

export default withStyles(styles)(AddChoiceDialog);
