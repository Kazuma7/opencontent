import admin from "firebase-admin";

let db: FirebaseFirestore.Firestore;

if (admin.apps.length > 0) {
  db = admin.firestore(admin.apps[0] as admin.app.App);
} else {
  const app = admin.initializeApp({});
  db = admin.firestore(app);
}

export { db };
