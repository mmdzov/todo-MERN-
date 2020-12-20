import { useContext } from "react";
import TodoContext from "../context/todoContext";
import TodoList from "./TodoList";

const TodoApp = () => {
  const {
    value,
    setValue,
    handleBuildNewTodo,
    lastValue,
    handleSubmitEditTodo,
  } = useContext(TodoContext);

  return (
    <div className='container' style={{ padding: "20px 0px" }}>
      <div className='row'>
        <div className='col'>
          <form
            onSubmit={lastValue._id ? handleSubmitEditTodo : handleBuildNewTodo}>
            <input
              type='text'
              placeholder='write a work'
              className='form-control'
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button
              className={`btn btn-${lastValue._id ? "primary" : "success"}`}
              type='submit'
              style={{ marginTop: 10 }}>
              {lastValue._id ? "Update" : "Add"}
            </button>
          </form>
        </div>
      </div>
      <TodoList />
    </div>
  );
};
export default TodoApp;
