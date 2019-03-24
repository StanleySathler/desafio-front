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

const updateById = (resourceName, id, updatedData) => (
  getDatabase()
    .collection(resourceName)
    .doc(id)
    .update(updatedData)
)

export default {
  get,
  getById,
  updateById,
};
