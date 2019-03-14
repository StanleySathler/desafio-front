const getDatabase = () => (
  firebase.firestore()
);

const get = (resourceName) => (
  getDatabase()
    .collection(resourceName)
    .orderBy('name')
    .get()
);

const getById = (resourceName, id) => (
  getDatabase()
    .collection(resourceName)
    .doc(id)
    .get()
);

export default {
  get,
  getById,
};
