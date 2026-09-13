import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
initializeApp({ projectId: 'cloud-320d1' });
async function test() {
  try {
    const db = getFirestore();
    await db.collection('test').doc('test').set({ a: 1 });
    console.log("Firestore admin write successful");
  } catch (e) {
    console.error("Firestore admin error:", e.message);
  }
}
test();
