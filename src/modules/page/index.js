import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { getPage } from '../../services/data';

class PageView extends React.Component {
  state = {
    page: null
  }

  componentWillMount() {
    const { pageId } = this.props.match.params;

    getPage(pageId).then(page =>
      this.setState({ page }));
  }

  handleInputChanged = ({ currentTarget: { name, value } }) =>
    this.setState({ [name]: value });

  render() {
    const { page } = this.state;

    if (!page) {
      return null;
    }

    return (
      <Fragment>
        <AppBar color="default" position="sticky">
          <Toolbar>
            <IconButton color="primary" component={Link} to={`/books/${page.bookId}/pages`}>
              <Icon>collections_bookmark</Icon>
            </IconButton>
            <IconButton color="primary" component={Link} to={`/pages/${page.id}/choices`}>
              <Icon>shuffle</Icon>
            </IconButton>
          </Toolbar>          
        </AppBar>
        <Grid container justify="center">
          <Grid item xs={11}>
            <TextField
              label="Content"
              margin="normal"
              defaultValue={page.content}
              variant="outlined"
              onChange={this.handleInputChanged}
              fullWidth
              multiline
              rows={10}
            />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
};

export default PageView;