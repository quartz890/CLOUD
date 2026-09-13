import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
try {
  initializeApp({ projectId: 'cloud-320d1' });
  console.log("Firebase admin initialized.");
  const auth = getAuth();
  console.log("Got auth:", !!auth);
} catch(e) {
  console.error(e);
}
