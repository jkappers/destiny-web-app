// eslint-disable-next-line
const provider = () => firebase.firestore();

const getBooks = () =>
  provider().collection('books').get();

export {
  getBooks
}