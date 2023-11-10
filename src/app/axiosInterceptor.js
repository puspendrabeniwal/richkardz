import axios from "axios";
import { API_URL } from "./global_constant";

// Create an instance of Axios with default configuration
const instance = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor
instance.interceptors.request.use(


);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Modify the response data here
    return response.data;
  },
  function (error) {
    // Handle response error
    return Promise.reject(error);
  }
);

export default instance;
