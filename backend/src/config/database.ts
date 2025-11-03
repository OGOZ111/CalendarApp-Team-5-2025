import * as admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// Initialize Firebase using environment variables.
// Prefer explicit service account JSON passed via FIREBASE_SERVICE_ACCOUNT_JSON.
// Fallback to Application Default Credentials if not provided.
(() => {
  const databaseURL = process.env.FIREBASE_DATABASE_URL;
  const storageBucket = process.env.GCLOUD_STORAGE_BUCKET;

  if (admin.apps.length === 0) {
    if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
      try {
        const sa = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
        admin.initializeApp({
          credential: admin.credential.cert(sa as admin.ServiceAccount),
          databaseURL,
          storageBucket,
        });
      } catch (e) {
        console.error("Invalid FIREBASE_SERVICE_ACCOUNT_JSON. Falling back to ADC.", e);
        admin.initializeApp({
          credential: admin.credential.applicationDefault(),
          databaseURL,
          storageBucket,
        });
      }
    } else {
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        databaseURL,
        storageBucket,
      });
    }
  }
})();

// Connect confirmed
function getDatabase() {
  console.log("Connection to Firebase successful!");
  return admin.database();
}

export default getDatabase;
