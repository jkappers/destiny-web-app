const admin = require('firebase-admin');
const credential = require('../storage/getCredentials')();

admin.initializeApp({ credential });

module.exports = () =>
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