import React from 'react';
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Icon from '@material-ui/core/Icon';

const PageList = ({ pages }) => (
  <List>
    <ListSubheader>Pages</ListSubheader>
    {pages.map(page => (
      <ListItem key={page.id} button divider component={Link} to={`/pages/${page.id}`}>
        <ListItemText primary={page.content.substring(0, 300)} />
        <ListItemIcon>
          <Icon>chevron_right</Icon>
        </ListItemIcon>
      </ListItem>
    ))}
  </List>
);

export default PageList;
