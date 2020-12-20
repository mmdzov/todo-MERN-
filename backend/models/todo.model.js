const client = require("./db");
const mongo = require("mongodb");

const models = {
  create: (todo, next) => {
    client.connect((err, db) => {
      if (err) next(err);
      else db.collection("todo").insertOne(todo, next);
    });
  },
  read: (next) => {
    client.connect((err, db) => {
      if (err) next(err);
      else db.collection("todo").find({}).toArray(next);
    });
  },
  delete: (_id, next) => {
    client.connect((err, db) => {
      if (err) next(err);
      const objId = new mongo.ObjectID(_id);
      console.log(objId);
      db.collection("todo").deleteOne({ _id: objId }, next);
    });
  },
  update: (_id, todo, next) => {
    client.connect((err, db) => {
      if (err) next(err);
      const objId = new mongo.ObjectID(_id);
      db.collection("todo").updateOne({ _id: objId }, { $set: todo }, next);
    });
  },
};

module.exports = models;
