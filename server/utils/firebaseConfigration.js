import admin from "firebase-admin";
import serviceAccount from './serviceAccountKey.json' with {type:"json"};

const fireBase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


export default fireBase;