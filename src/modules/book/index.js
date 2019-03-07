import debounce from 'debounce';
import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/core/Icon';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import PageList from './components/PageList';
import { getBook, getPages, addPage } from '../../services/data';
import SearchTextField from '../../components/SearchTextField';

class BookView extends React.Component {
  state = {
    book: null
  }

  getSearchQuery = () =>
    new URLSearchParams(window.location.search).get('q') || '';

  setSearchQuery = debounce(q => {
    const next = { pathname: '' }

    if (q.length) {
      next.search = '?' + new URLSearchParams({ q }).toString()
    }

    this.props.history.push(next);
  }, 250)
  

  componentDidMount() {
    const { bookId } = this.props.match.params;

    Promise.all([
      getBook(bookId),
      getPages(bookId, this.getSearchQuery())
    ])
    .then(([book, pages]) => this.setState({ book, pages }));
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      getPages(this.props.match.params.bookId, this.getSearchQuery())
        .then(pages => this.setState({ pages }));
    }
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

  handleSearchChanged = ({ currentTarget: { value }}) => {
    if (value.length > 2 || (!value.length && this.props.location.search.length)) {
      this.setSearchQuery(value)
    }
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
            <SearchTextField
              defaultValue={this.getSearchQuery()}
              onChange={this.handleSearchChanged} />
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
