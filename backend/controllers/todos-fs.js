const fs = require("fs");
const path = require("path");
const { cwd } = require("process");

const dataFile = path.resolve(cwd() + "/data/todos.json");

const createTodo = (req, res) => {
  const value = req.body;
  req.accepts("application/json");
  fs.readFile(dataFile, (err, data) => {
    if (err) throw err;
    const idGenerate = Math.round(Math.random() * 9999999);
    const todo = {
      id: idGenerate,
      text: value.data,
    };
    data = JSON.parse(data);
    data.push(todo);
    data = JSON.stringify(data);
    fs.writeFile(dataFile, data, (err) => {
      if (err) throw err;
      res.send(todo);
    });
  });
};
const readTodo = (req, res) => {
  fs.readFile(dataFile, (err, data) => {
    if (err) throw err;
    data = JSON.parse(data);
    res.send(data);
    data = JSON.stringify(data);
  });
};
const updateTodo = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  fs.readFile(dataFile, (err, data) => {
    if (err) throw err;
    data = JSON.parse(data);
    const index = data.findIndex((item) => item.id === Number(id));
    data[index].text = body.currentVal;
    fs.writeFile(dataFile, JSON.stringify(data), (err) => {
      if (err) throw err;
      res.send(data[index]);
    });
  });
};
const deleteTodo = (req, res) => {
  const id = req.params.id;
  fs.readFile(dataFile, (err, data) => {
    if (err) throw err;
    data = JSON.parse(data);
    data = data.filter((item) => item.id !== Number(id));
    fs.writeFile(dataFile, JSON.stringify(data), (err) => {
      if (err) throw err;
      res.send(data);
    });
  });
};
const controller = {
  create: createTodo,
  read: readTodo,
  update: updateTodo,
  delete: deleteTodo,
};

module.exports = controller;
