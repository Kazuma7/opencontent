import admin from "firebase-admin";

export const app = admin.initializeApp({
  projectId: process.env.FIREBASE_PROJECT_ID,
});
