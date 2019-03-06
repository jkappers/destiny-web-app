var AWS = require('aws-sdk');
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const getSecrets = async () =>
  new Promise((resolve, reject) => {
    admin
      .storage()
      .bucket('destiny-app-cadf9.appspot.com')
      .file('secrets.json')
      .download((error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(JSON.parse(data.toString()))
        }
      });
  });

exports.indexPage = functions.https.onRequest(async (req, res) => {
  const { awsCloudSearchCredentials } = await getSecrets();
  AWS.config.credentials = new AWS.Credentials(awsCloudSearchCredentials);
  AWS.config.update({ region: 'us-east-1' });

  const csd = new AWS.CloudSearchDomain({
    endpoint: 'doc-destiny-search-0-5ufnvswgmkkkab6mjvv2dbfan4.us-east-1.cloudsearch.amazonaws.com'
  });

  const params = {
    contentType: 'application/json',
    documents: JSON.stringify([
      {
        "type": "add",
        "id":   "tt0484562",
        "fields": {
          "book_id": "123",
          "page_id": "123",
          "content": "an pineapple is in a tree with me and a monkey"
        }
      }
    ])
  }

  csd.uploadDocuments(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });

  res.send("xh");
});