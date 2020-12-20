import http from "./httpServices";
import { local } from "./config.json";

export const getAlltodos = () => {
  return http.get(`${local}/todos`);
};
export const buildNewTodo = (data) => {
  return http.post(`${local}/todos/build`, JSON.stringify(data));
};

export const editTodo = (id, data) => {
  return http.put(`${local}/todos/${id}`, data);
};

export const deleteTodo = (id) => {
  return http.delete(`${local}/todos/${id}`)
}