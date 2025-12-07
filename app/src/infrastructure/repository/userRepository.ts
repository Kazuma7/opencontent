import type { UserModel } from "@/domain/model/user";
import { userModelSchema } from "@/domain/model/user";
import type { Firestore, Timestamp } from "firebase-admin/firestore";

type FirestoreData = Omit<UserModel, "createdAt" | "updatedAt"> & {
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export class UserRepository {
  private readonly collectionName = "users";

  constructor(private readonly db: Firestore) {}

  async findById(
    userId: string,
    tx?: FirebaseFirestore.Transaction,
  ): Promise<UserModel | null> {
    const docRef = this.db.collection(this.collectionName).doc(userId);
    const doc = tx ? await tx.get(docRef) : await docRef.get();

    if (!doc.exists) {
      return null;
    }

    const data = doc.data() as FirestoreData;
    return userModelSchema.parse({
      ...data,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    });
  }

  async findByWalletAddress(
    walletAddress: string,
    tx?: FirebaseFirestore.Transaction,
  ): Promise<UserModel | null> {
    const queryRef = this.db
      .collection(this.collectionName)
      .where("walletAddress", "==", walletAddress);
    const queryResult = tx ? await tx.get(queryRef) : await queryRef.get();

    if (queryResult.empty || !queryResult.docs[0].exists) {
      return null;
    }

    const data = queryResult.docs[0].data() as FirestoreData;
    return userModelSchema.parse({
      ...data,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    });
  }

  async save(
    user: UserModel,
    tx?: FirebaseFirestore.Transaction,
  ): Promise<void> {
    const docRef = this.db.collection(this.collectionName).doc(user.userId);
    const now = new Date();

    const data = {
      ...user,
      updatedAt: now,
      createdAt: user.createdAt || now,
    };

    if (tx) {
      tx.set(docRef, data);
    } else {
      await docRef.set(data);
    }
  }
}
