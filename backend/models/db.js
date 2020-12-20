const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017/todoDb";

let db = null;
const connect = async (next) => {
  const client = new MongoClient(url);
  if (db) {
    next(null, db);
    return;
  }
  try {
    await client.connect();
    db = client.db();
    next(null, db);
  } catch (e) {
    next(e);
  }
  client.close();
};

module.exports.connect = connect;
