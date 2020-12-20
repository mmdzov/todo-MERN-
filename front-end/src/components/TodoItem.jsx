import React, { useContext, useState } from "react";
import TodoContext from "../context/todoContext";

const TodoItem = ({ todo }) => {
  const [isDone, setIsDone] = useState(todo.isDone);
  const { handleEditTodo, handleDeleteTodo, handleCompleted } = useContext(
    TodoContext,
  );
  return (
    <tr>
      <td
        onClick={() => handleCompleted(todo._id, setIsDone)}
        style={{
          textDecoration: isDone ? "line-through" : "none",
        }}>
        {todo.text}
      </td>
      <td onClick={() => handleEditTodo(todo._id)}>
        <button className='btn btn-warning'>EDIT</button>
      </td>
      <td onClick={() => handleDeleteTodo(todo._id)}>
        <button className='btn btn-danger'>DELETE</button>
      </td>
    </tr>
  );
};

export default TodoItem;
