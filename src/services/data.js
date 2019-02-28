// eslint-disable-next-line
const db = firebase.firestore();
const adapter = record => ({ ...record.data(), id: record.id });

const getBooks = () =>
  db.collection('books').get()
    .then(query => query.docs.map(adapter));

const getBook = id =>
  db.collection('books').doc(id).get()
    .then(doc => adapter(doc));

const addConnection = data => {
  const id = `${data.fromPageId}_${data.toPageId}`;
  return db
    .collection('connections')
    .doc(id)
    .set(data)
    .then(doc => ({ id, ...data }));
}
  
const getConnectionsToPageId = pageId =>
  db.collection('connections')
    .where('toPageId', '==', pageId)
    .get()
    .then(query => query.docs.map(adapter));

const getConnectionsFromPageId = pageId =>
  db.collection('connections')
    .where('fromPageId', '==', pageId)
    .get()
    .then(query => query.docs.map(adapter));

const addPage = data =>
  db.collection('pages').add(data)
    .then(doc => ({ id: doc.id, ...data }));

const getPage = pageId =>
  db.collection('pages').doc(pageId).get()
    .then(doc => adapter(doc));

const getPageByBookId = bookId =>
  db.collection('pages')
    .where('bookId', '==', bookId)
    .get()
    .then(query => query.docs.map(adapter));

export {
  getBook,
  getBooks,
  addConnection,
  getConnectionsToPageId,
  getConnectionsFromPageId,
  addPage,
  getPage,
  getPageByBookId
}