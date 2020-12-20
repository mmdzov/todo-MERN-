import React, { useContext } from "react";
import TodoContext from "../context/todoContext";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const { todos } = useContext(TodoContext);
  return (
    <div
      className='row'
      style={{ marginTop: 30, display: "flex", flexDirection: "column" }}>
      <div className='col'>
        <table className='table table-hover'>
          <tbody>
            {todos.map((todo) => (
              <TodoItem todo={todo} key={todo._id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoList;
