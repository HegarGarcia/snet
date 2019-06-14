import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

export interface IPost {
  content: string;
  publisher: string;
  publisherPhotoURL: string;
  publisherName: string;
  likeCount: number;
  timestamp: admin.firestore.Timestamp;
}

export interface IUser {
  uid: string;
  name: string;
  photoURL: string;
  email: string;
  address?: string;
  phone?: string;
}

const fanOut = async (doc: FirebaseFirestore.DocumentSnapshot) => {
  const firestore = admin.firestore();
  const post = doc.data() as IPost;

  const batch = firestore.batch();
  const timelineRef = firestore.doc(
    `users/${post.publisher}/timeline/${doc.id}`
  );
  const followers = await firestore
    .collection(`users/${post.publisher}/followers`)
    .get();

  await firestore
    .doc(`users/${post.publisher}/timeline/${doc.id}`)
    .set(post)
    .catch(console.log);

  if (!followers.empty) {
    followers.docs.forEach(follower => {
      const path = firestore.doc(`users/${follower.id}/timeline/${doc.id}`);
      batch.set(path, post);
    });
  }

  batch.set(timelineRef, post);

  return batch.commit().catch(console.log);
};

export const flanOutPost = functions.firestore
  .document('posts/{id}')
  .onCreate(async snap => {
    return fanOut(snap);
  });

export const updatePost = functions.firestore
  .document('posts/{id}')
  .onUpdate(async ({ after }) => {
    return fanOut(after);
  });

export const deletePost = functions.firestore
  .document('posts/{id}')
  .onDelete(async snap => {
    const firestore = admin.firestore();
    const post = snap.data() as IPost;
    const batch = firestore.batch();
    const followers = await firestore
      .collection(`users/${post.publisher}/followers`)
      .get();

    await firestore
      .doc(`users/${post.publisher}/timeline/${snap.id}`)
      .delete()
      .catch(console.log);

    if (!followers.empty) {
      followers.forEach(follower => {
        const ref = firestore.doc(`users/${follower.id}/timeline/${snap.id}`);
        batch.delete(ref);
      });
    }

    return batch.commit().catch(console.log);
  });

export const authUser = functions.auth.user().onCreate(async credentials => {
  if (credentials.photoURL) {
    return;
  }

  const firestore = admin.firestore();
  const storage = await admin
    .storage()
    .bucket()
    .file('profile_pictures/default.png')
    .getSignedUrl({ action: 'read', expires: '1-1-2020' });
  return Promise.all([
    admin.auth().updateUser(credentials.uid, { photoURL: storage[0] }),
    firestore.doc(`users/${credentials.uid}`).update({ photoURL: storage[0] })
  ]);
});

export const deleteUser = functions.firestore
  .document('users/{uid}')
  .onDelete(async snap => {
    const firestore = admin.firestore();
    const user = snap.data() as IUser;

    await admin
      .auth()
      .deleteUser(user.uid)
      .catch(console.log);

    const followers = await firestore
      .collection(`users/${user.uid}/followers`)
      .get();
    const followed = await firestore
      .collection(`users/${user.uid}/followed`)
      .get();

    if (!followers.empty) {
      followers.forEach(async follower => {
        const path = `users/${follower.id}/followed/${user.uid}`;
        await firestore.doc(path).delete();
      });
    }

    if (!followed.empty) {
      followed.forEach(async follower => {
        const path = `users/${follower.id}/followers/${user.uid}`;
        await firestore.doc(path).delete();
      });
    }
  });
