import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:8000", //rust backend
    auth: {
        username: "admin",
        password: "admin"
    },
    headers: {
        "Content-type": "application/json"
    }
});