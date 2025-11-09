import {
  ContentModel,
  Category,
  contentModelSchema,
} from "@/domain/model/content";
import type { Firestore } from "firebase-admin/firestore";
import { Timestamp } from "firebase-admin/firestore";

export class ContentRepository {
  private readonly collectionName = "contents";

  constructor(private readonly db: Firestore) {}

  async findById(
    contentId: string,
    tx?: FirebaseFirestore.Transaction,
  ): Promise<ContentModel | null> {
    const docRef = this.db.collection(this.collectionName).doc(contentId);
    const doc = tx ? await tx.get(docRef) : await docRef.get();

    if (!doc.exists) {
      return null;
    }

    const data = doc.data();
    if (!data) {
      return null;
    }

    return contentModelSchema.parse(this.convertFromFirestore(data));
  }

  async save(
    content: ContentModel,
    tx?: FirebaseFirestore.Transaction,
  ): Promise<void> {
    const docRef = this.db
      .collection(this.collectionName)
      .doc(content.contentId);
    const doc = tx ? await tx.get(docRef) : await docRef.get();

    const now = Timestamp.now();
    const data = this.convertToFirestore(content);

    if (doc.exists) {
      if (tx) {
        tx.update(docRef, {
          ...data,
          updatedAt: now,
        });
      } else {
        await docRef.update({
          ...data,
          updatedAt: now,
        });
      }
    } else {
      if (tx) {
        tx.set(docRef, {
          ...data,
          createdAt: now,
          updatedAt: now,
        });
      } else {
        await docRef.set({
          ...data,
          createdAt: now,
          updatedAt: now,
        });
      }
    }
  }

  async findByUserId(
    userId: string,
    tx?: FirebaseFirestore.Transaction,
  ): Promise<ContentModel[]> {
    const query = this.db
      .collection(this.collectionName)
      .where("userId", "==", userId);
    const querySnapshot = tx ? await tx.get(query) : await query.get();

    if (querySnapshot.empty) {
      return [];
    }

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return contentModelSchema.parse(this.convertFromFirestore(data));
    });
  }

  async findPublicContents(
    filters?: { category?: Category; tags?: string[]; search?: string },
    tx?: FirebaseFirestore.Transaction,
  ): Promise<ContentModel[]> {
    let query: FirebaseFirestore.Query = this.db
      .collection(this.collectionName)
      .where("visibility", "==", "public");

    if (filters?.category) {
      query = query.where("category", "==", filters.category);
    }

    if (filters?.tags && filters.tags.length > 0) {
      query = query.where("tags", "array-contains-any", filters.tags);
    }

    const querySnapshot = tx ? await tx.get(query) : await query.get();

    if (querySnapshot.empty) {
      return [];
    }

    let results = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return contentModelSchema.parse(this.convertFromFirestore(data));
    });

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      results = results.filter(
        (content) =>
          content.name.toLowerCase().includes(searchLower) ||
          content.description.toLowerCase().includes(searchLower),
      );
    }

    return results;
  }

  private convertFromFirestore(data: FirebaseFirestore.DocumentData): unknown {
    return {
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
      publishStartAt: data.publishStartAt?.toDate() || new Date(),
      publishEndAt: data.publishEndAt ? data.publishEndAt.toDate() : undefined,
      saleStartAt: data.saleStartAt?.toDate() || new Date(),
      saleEndAt: data.saleEndAt ? data.saleEndAt.toDate() : undefined,
    };
  }

  private convertToFirestore(
    content: ContentModel,
  ): FirebaseFirestore.DocumentData {
    return {
      ...content,
      createdAt: Timestamp.fromDate(content.createdAt),
      updatedAt: Timestamp.fromDate(content.updatedAt),
      publishStartAt: Timestamp.fromDate(content.publishStartAt),
      publishEndAt: content.publishEndAt
        ? Timestamp.fromDate(content.publishEndAt)
        : null,
      saleStartAt: Timestamp.fromDate(content.saleStartAt),
      saleEndAt: content.saleEndAt
        ? Timestamp.fromDate(content.saleEndAt)
        : null,
    };
  }
}
