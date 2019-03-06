const AWS = require('aws-sdk');
const functions = require('firebase-functions');
const getSecrets = require('./config/getSecrets');

async function getDomain() {
  const { awsCloudSearchCredentials } = await getSecrets();
  AWS.config.credentials = new AWS.Credentials(awsCloudSearchCredentials);
  AWS.config.update({ region: 'us-east-1' });
  
  return new AWS.CloudSearchDomain({
    endpoint: 'doc-destiny-search-0-5ufnvswgmkkkab6mjvv2dbfan4.us-east-1.cloudsearch.amazonaws.com'
  }); 
}

const onDocumentUploaded = (err, data) => {
  err ? console.error(err, err.stack) : console.log(data);
}

const payload = (id, fields) => ({
  contentType: 'application/json',
  documents: JSON.stringify([{
    id, type: 'add', fields
  }])
});

const handlePageCreated = async (snap, context) => {
  const domain = await getDomain();
  const { bookId, content } = snap.data();
  domain.uploadDocuments(
    payload(context.params.id, {
      book_id: bookId,
      content
    }), onDocumentUploaded);  
}

const handlePageUpdated = async (change, context) => {
  const domain = await getDomain();
  const { bookId, content } = change.after.data();
  domain.uploadDocuments(
    payload(context.params.id, {
      book_id: bookId,
      content
    }), onDocumentUploaded);
};

const handlePageDeleted = async (data, context) => {
  const domain = await getDomain();
  domain.uploadDocuments({
    contentType: 'application/json',
    documents: JSON.stringify([{
      "type": "delete",
      "id": context.params.id,
    }])
  }, onDocumentUploaded);  
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