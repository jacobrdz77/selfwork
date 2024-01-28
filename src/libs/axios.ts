import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api/",
  timeout: 5000,

  headers: {
    // Authorization: AUTH_TOKEN
  },
});

export { axiosInstance as axios };
