import { app } from "@/lib/firebase";
import admin from "firebase-admin";

const db = admin.firestore(app);
export { db };
