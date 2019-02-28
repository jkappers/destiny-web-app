import React from 'react';
import { Link } from 'react-router-dom'
import { getBooks } from '../../services/data';

class BooksView extends React.Component {
  state = {
    books: []
  }

  componentWillMount() {
    getBooks().then(books => this.setState({ books }));
  }

  render() {
    return this.state.books.map(x => (
      <div key={x.id}>
        <Link to={`/books/${x.id}/pages`}>{x.title}</Link>
      </div>
    ));
  }
}

export default BooksView;
