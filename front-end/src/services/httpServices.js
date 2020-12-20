import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.response.use(null, (error) => {
  const errorException =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!errorException) {
    console.log(error);
    toast.error("مشکلی از سمت سرور رخ داده است", {
      closeOnClick: true,
      position: "bottom-right",
    });
  }
  return Promise.reject(error);
});

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default http;
