let admin = require("firebase-admin");

let serviceAccount = require("../firebase_notification_config.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mytownbusiness-52f78.firebaseio.com/"
});

module.exports.notify = admin;