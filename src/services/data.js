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

const deletePage = pageId =>
  db.collection('pages').doc(pageId).delete();

const getPage = pageId =>
  db.collection('pages').doc(pageId).get()
    .then(doc => adapter(doc));

const getPages = (bookId, query = '') => {
  if (query.length) {
    return searchPages(bookId, query.split(' '));
  }

  return db
    .collection('pages')
    .where('bookId', '==', bookId)
    .get()
    .then(query => query.docs.map(adapter));
}

const savePage = (pageId, data) =>
  db.collection('pages').doc(pageId).update(data);

const searchPages = (bookId, terms) =>
  fetch(`https://gajjyu9l8c.execute-api.us-east-1.amazonaws.com/production/pages?size=10&q=${terms.join(' ')}&fq=book_id:'${bookId}'`, {
    mode: 'cors'
  })
    .then(async response => await response.json())
    .then(data => data.documents)

export {
  getBook,
  getBooks,
  addConnection,
  getConnectionsToPageId,
  getConnectionsFromPageId,
  addPage,
  deletePage,
  getPage,
  getPages,
  savePage
}