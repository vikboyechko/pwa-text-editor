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
export const putDb = async (content) => {
    console.log('Update the database');

    // create connection to db
    const jateDb = await openDB('jate', 1);

    // create a new transaction
    const tx = jateDb.transaction('jate', 'readwrite');

    // open the object store
    const store = tx.objectStore('jate');

    // put one
    const request = store.put({ id: 1, value: content });

    //confirmation
    const result = await request;
    console.log('result', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
    console.log('GET from the database');

    // create connection to db
    const jateDb = await openDB('jate', 1);

    // create a new transaction
    const tx = jateDb.transaction('jate', 'readonly');

    // open the object store
    const store = tx.objectStore('jate');

    // get one
    const request = store.get(1);

    //confirmation
    const result = await request;
    console.log('result.value', result);
    return result?.value;
};

initdb();
