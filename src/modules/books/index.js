import React from 'react';
import { getBooks } from '../../services/data';

class BooksView extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    getBooks().then(querySnapshot => {
      console.log(querySnapshot.size);
      const books = querySnapshot.docs.map(documentSnapshot => ({
        ...documentSnapshot.data(),
        id: documentSnapshot.id
      }));
    
      this.setState({ books });
    })
  }

  render() {
    return this.state.books.map(x => (<div>X{x.title}</div>))
  }
}

export default BooksView;
