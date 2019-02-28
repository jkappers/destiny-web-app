import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/core/Icon';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import PageList from './components/PageList';
import SearchTextField from '../../components/SearchTextField';
import { getBook, getPageByBookId, addPage } from '../../services/data';

class BookView extends React.Component {
  state = {
    book: null
  }

  componentDidMount() {
    const { bookId } = this.props.match.params;

    Promise.all([
      getBook(bookId),
      getPageByBookId(bookId)
    ])
    .then(([book, pages]) => this.setState({ book, pages }));
  }

  handleAddButtonClicked = () => {
    const { bookId } = this.props.match.params;

    const data = {
      bookId,
      content: 'TODO: Add content or delete me...'
    }
  
    addPage(data).then(data => {
      this.setState({
        pages: [...this.state.pages, data]
      })
    })
  }

  render() {
    const { book } = this.state;

    if (!book) {
      return <CircularProgress />
    }

    return (
      <Fragment>
        <AppBar color="default" position="static">
          <Toolbar variant="dense">
            <SearchTextField />
          </Toolbar>
        </AppBar>
      
        <PageList
          pages={this.state.pages}
        />
        <Fab
          color="primary"
          aria-label="Add"
          onClick={this.handleAddButtonClicked}
          className={this.props.classes.fab}>
          <Icon>add_icon</Icon>
        </Fab>          
      </Fragment>
    )
  }
}

const styles = theme => ({
  grow: {
    flexGrow: 1 
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  }
});

export default withStyles(styles)(BookView);
