import axios from "axios";

export default axios.create({
    baseURL: "https://inno.dergeorg.at", //rust backend
    auth: {
        username: "admin",
        password: "admin"
    },
    headers: {
        "Content-type": "application/json"
    }
});