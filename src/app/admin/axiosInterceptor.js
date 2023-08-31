import axios from 'axios';

// Create an instance of Axios with default configuration
const instance = axios.create({
  baseURL: 'http://localhost:8005/api/',
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    config.headers['content-type'] = 'multipart/mixed; boundary=gc0p4Jq0M2Yt08jU534c0p';

    // Modify the request configuration here
    // For example, add authorization header
    //const authToken = localStorage.getItem('authToken');
    const authToken = "64e797cc739e3d49b24356ff";
    if (authToken) {
      config.headers['Authorization'] = `Bearer ${authToken}`;
    }
    return config;
  },
  function (error) {
    // Handle request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    console.log(response, "response")
    // Modify the response data here
    return response.data;
  },
  function (error) {
    // Handle response error
    return Promise.reject(error);
  }
);

export default instance;
