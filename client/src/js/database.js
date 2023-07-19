import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) =>{
  console.log("PUT To The J.A.T.E DataBase");
  const jateDB = await openDB("jate", 1);
  const tx = jateDB.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  const req = store.put({id: "id", value: content});
  const res = await req;
  console.log('Data Has Been Saved To The DataBase', res);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("GET From The J.A.T.E DataBase");
  const jateDB = await openDB("jate", 1);
  const tx = jateDB.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const req = store.get(1);
  const res = await req;
  console.log('Data From The DataBase Has Been Fetched', res);
  return res?.value;
};

initdb();