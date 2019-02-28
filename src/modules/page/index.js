import debounce from 'debounce';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import IconedButton from '../../components/IconedButton';
import Main from '../../components/Main';
import { getPage, savePage } from '../../services/data';

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

  handleSubmit = e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    savePage(this.props.match.params.pageId, {
      content: data.get('content')
    });
  };

  render() {
    const { page } = this.state;

    if (!page) {
      return null;
    }

    return (
      <Fragment>
        <AppBar color="default" position="sticky">
          <Toolbar>
            <IconedButton
              color="primary"
              component={Link}
              to={`/books/${page.bookId}/pages`}
              icon={<Icon>list</Icon>}>
              Pages
            </IconedButton>
            <div className={this.props.classes.grow} />
            <IconedButton
              color="primary"
              component={Link}
              to={`/pages/${page.id}/choices`}
              icon={<Icon>shuffle</Icon>}>
              Choices
            </IconedButton>
          </Toolbar>          
        </AppBar>
        <Main>
          <Grid container justify="center">
            <Grid item xs={11}>
              <form onSubmit={this.handleSubmit}>
                <TextField
                  name="content"
                  label="Content"
                  margin="normal"
                  defaultValue={page.content}
                  variant="outlined"
                  onChange={this.handleInputChanged}
                  fullWidth
                  multiline
                  rows={10}                
                />

                <Toolbar disableGutters>
                  <div className={this.props.classes.grow} />
                  <IconedButton
                    icon={<Icon>save</Icon>}
                    type="submit">
                    Save
                  </IconedButton>
                </Toolbar>
              </form>
            </Grid>
          </Grid>
        </Main>
      </Fragment>
    );
  }
};

const styles = theme => ({
  grow: {
    flexGrow: 1
  }
});

export default withStyles(styles)(PageView);