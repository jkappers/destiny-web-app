const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

module.exports = () =>
  admin.credential.cert(serviceAccount);