const models = require("../models/todo.model");

const createTodo = (req, res) => {
  const value = req.body;
  models.create(value, (err, result) => {
    if (err) res.status(500).send(err);
    else res.send(result.ops);
  });
};
const readTodo = (req, res) => {
  models.read((err, data) => {
    if (err) res.status(500).send(err);
    else res.send(data);
  });
};
const updateTodo = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const name = Reflect.ownKeys(body);
  const value = Reflect.get(body, name);
  models.update(id, { [name]: value }, (err, result) => {
    if (err) res.status(500).send(err);
    else res.send(result);
  });
};
const deleteTodo = (req, res) => {
  const id = req.params.id;
  models.delete(id, (err, result) => {
    if (err) res.status(500).send(err);
    res.send(result);
  });
};
const controller = {
  create: createTodo,
  read: readTodo,
  update: updateTodo,
  delete: deleteTodo,
};

module.exports = controller;
