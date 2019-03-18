const algoliasearch = require('algoliasearch');
const functions = require('firebase-functions');
const getSecrets = require('./config/getSecrets');

async function getAlgoliaIndex() {
  const { algolia } = await getSecrets();
  
  return algoliasearch(
    algolia.appId,
    algolia.apiKey
  ).initIndex(algolia.indexName);
}

const saveOrUpdateObject = object =>
  getAlgoliaIndex()
    .then(index => index.saveObject(object))
    .catch(error => {
      console.error(`Error saving document on Algolia ${object.objectId}`, error);
      process.exit(1);
    });

const handlePageCreated = async (snap, context) => {
  const { bookId, content } = snap.data();  
  saveOrUpdateObject({
    objectID: context.params.id,
    bookId,
    content
  })
}

const handlePageUpdated = async (change, context) => {
  const { bookId, content } = change.after.data();
  saveOrUpdateObject({
    objectID: context.params.id,
    bookId,
    content
  })
};

const handlePageDeleted = async (_data, context) => {
  const index = await getAlgoliaIndex();
  index
    .deleteObject(context.params.id)
    .catch(error => {
      console.error('Error when updating document on Algolia', error);
      process.exit(1);
    });
}

exports.onPageCreated = functions.firestore
  .document('pages/{id}')
  .onCreate(handlePageCreated);

exports.onPageUpdated = functions.firestore
  .document('pages/{id}')
  .onUpdate(handlePageUpdated);

exports.onPageDeleted = functions.firestore
  .document('pages/{id}')
  .onDelete(handlePageDeleted)