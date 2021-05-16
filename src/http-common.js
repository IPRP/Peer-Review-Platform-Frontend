import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:3000", //mocked backend
    auth: {
        username: "lukasnowy",
        password: "1234"
    },
    headers: {
        "Content-type": "application/json"
    }
});