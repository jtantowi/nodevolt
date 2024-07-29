const mongoose = require('mongoose');
const { localMongoUri } = require('../configs');

module.exports = async () => {
  try {
    const db = await mongoose.connect(localMongoUri);
    console.log(
      `Connected to Mongo! Database name: "${db.connections[0].name}"`
    );
    return db;
  } catch (err) {
    console.error(`Error connecting to mongo: ${err}`);
    return err;
  }
};
