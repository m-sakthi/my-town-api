const admin = require("firebase-admin");
const serviceAccount = process.env.NODE_ENV === "production" ?
  process.env.MY_TOWN_API_FIREBASE_NOTIFICATION :
  require("../firebase_notification_config.json")

module.exports.notify = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.NODE_ENV === "production" ?
    process.env.MY_TOWN_API_FIREBASE_NOTIFICATION_DB_URL :
    "https://mytownbusiness-52f78.firebaseio.com/"
});