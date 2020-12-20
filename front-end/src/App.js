import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import TodoApp from "./components/Todo";
import TodoContext from "./context/todoContext";
import {
  buildNewTodo,
  deleteTodo,
  editTodo,
  getAlltodos,
} from "./services/todoService";
const App = () => {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [beforeEdit, setBeforeEdit] = useState({});
  const makeNewtodo = async (todoData) => {
    try {
      const { data } = await buildNewTodo({ text: todoData, isDone: false });
      const allTodos = [...todos];
      allTodos.push(data[0]);
      setTodos(allTodos);
      setValue("");
    } catch (err) {
      console.log(err);
    }
  };
  const handleBuildNewTodo = (e) => {
    e.preventDefault();
    makeNewtodo(value);
  };
  const fetchAllTodos = async () => {
    try {
      const { data, status } = await getAlltodos();
      if (status === 200) {
        setTodos(data);
      }
      return false;
    } catch (err) {
      console.log(err);
      toast.error("مشکلی وجود دارد", {
        closeOnClick: true,
        position: "bottom-right",
      });
    }
  };
  const handleEditTodo = async (id) => {
    const getTodos = [...todos];
    const index = getTodos.findIndex((item) => item._id === id);
    setValue(getTodos[index].text);
    setBeforeEdit(getTodos[index]);
  };
  const handleSubmitEditTodo = async (e) => {
    e.preventDefault();
    const datas = { text: value };
    try {
      const { data } = await editTodo(beforeEdit._id, datas);
      const index = todos.findIndex((item) => item._id === beforeEdit._id);
      if (data.modifiedCount === 1) {
        const allTodos = [...todos];
        allTodos[index].text = value;
        setTodos(allTodos);
        setValue("");
        setBeforeEdit({});
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteTodo = async (id) => {
    try {
      const { data } = await deleteTodo(id);
      const filtered = todos.filter((item) => item._id !== id);
      if (data.deletedCount === 1) setTodos(filtered);
    } catch (e) {
      console.log(e);
    }
  };
  const handleCompleted = async (id, next) => {
    try {
      const { data } = await editTodo(id, { isDone: true });
      if (data.modifiedCount === 1) {
        next(true);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchAllTodos();
  }, []);
  return (
    <TodoContext.Provider
      value={{
        todos,
        value,
        lastValue: beforeEdit,
        setValue,
        setTodos,
        handleBuildNewTodo,
        handleEditTodo,
        handleSubmitEditTodo,
        handleDeleteTodo,
        handleCompleted,
      }}>
      <TodoApp />
      <ToastContainer />
    </TodoContext.Provider>
  );
};

export default App;
