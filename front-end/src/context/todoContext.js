const { createContext } = require("react");

const TodoContext = createContext({
  todos: [],
  value: "",
  lastValue: "",
  setValue: () => {},
  setTodos: () => {},
  handleBuildNewTodo: () => {},
  handleEditTodo: () => {},
  handleSubmitEditTodo: () => {},
  handleDeleteTodo: () => {},
  handleCompleted: () => {},
});

export default TodoContext;
