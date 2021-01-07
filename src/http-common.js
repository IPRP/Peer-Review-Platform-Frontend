import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/",
  auth: {
    username: "admin",  //This could be your email
    password: "admin"
  },
  headers: {
    "Content-type": "application/json"
  }
});
