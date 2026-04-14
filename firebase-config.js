import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set, onValue, push, remove }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey:            "AIzaSyAgGKJ0SWcPcD18HmZWfA5WnEOeLDuK9Jc",
  authDomain:        "l-eclat-avec-cassandra.firebaseapp.com",
  databaseURL:       "https://l-eclat-avec-cassandra-default-rtdb.europe-west1.firebasedatabase.app",
  projectId:         "l-eclat-avec-cassandra",
  storageBucket:     "l-eclat-avec-cassandra.firebasestorage.app",
  messagingSenderId: "94077156114",
  appId:             "1:94077156114:web:ee7d4d6d018a6e132611cb"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);

window.DB = {
  listen(path, callback) {
    const r = ref(db, path);
    onValue(r, snap => {
      const data = snap.val();
      const arr = data ? Object.entries(data).map(([id, v]) => ({ ...v, id })) : [];
      callback(arr);
    });
  },
  async save(path, id, data) {
    const r = ref(db, path + "/" + id);
    await set(r, { ...data, id });
  },
  async remove(path, id) {
    const r = ref(db, path + "/" + id);
    await remove(r);
  },
  newId(path) {
    return push(ref(db, path)).key;
  }
};
console.log("Firebase connecte - Cassandra Planning");