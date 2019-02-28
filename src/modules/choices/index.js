import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { addConnection, getConnectionsFromPageId } from '../../services/data';

class ChoicesView extends Component {
  state = {
    destinations: []
  }

  componentWillMount() {
    const { pageId } = this.props.match.params;

    getConnectionsFromPageId(pageId)
      .then(destinations => this.setState({ destinations }));
  }

  onAddClicked = () => {
    addConnection({
      toPageId: 'xxx',
      fromPageId: this.props.match.params.pageId,
      description: 'Hello'
    }).then(destination =>
      this.setState({ destinations: this.state.destinations.concat(destination) }))
  }

  render = () => (
    <Fragment>
      <AppBar color="default" position="sticky">
        <Toolbar>
          <IconButton color="primary" component={Link} to={`/pages/${this.props.match.params.pageId}`}>
            <Icon>insert_drive_file</Icon>
          </IconButton>
        </Toolbar>          
      </AppBar>    
      <List>
        <ListSubheader>Choices</ListSubheader>
        {this.state.destinations.map(destination => (
          <ListItem key={destination.id} button divider>
            <ListItemText primary={destination.description} />
            <ListItemIcon>
              <Icon>open_in_new</Icon>
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
      <Fab
        color="primary"
        aria-label="Add"
        onClick={this.onAddClicked}
        className={this.props.classes.fab}>
        <Icon>add_icon</Icon>
      </Fab>
    </Fragment>
  );
}

const styles = theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  }
});

export default withStyles(styles)(ChoicesView);