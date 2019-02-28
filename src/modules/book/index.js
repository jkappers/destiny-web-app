import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { getBook, getPageByBookId, addPage } from '../../services/data';
import PageList from './components/PageList';

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
      return "Loading book.";
    }

    return (
      <div>
        <h1>{book.title}</h1>
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
      </div>
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
