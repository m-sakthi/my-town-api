const admin = require("firebase-admin");
const serviceAccount = require("../firebase_notification_config.json");

module.exports.notify = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mytownbusiness-52f78.firebaseio.com/"
});