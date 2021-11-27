// import http from "../http-common";
import axios from "axios";

class DataService {
    static baseURL = "https://inno.dergeorg.at";

    uploadFile(username, pw, formData) {
        return axios.post(DataService.baseURL + "/upload", formData, {
            auth: {
                username: username,
                password: pw
            }
        });
    }

    getAllWorkshopsTeacher(username, pw) {
        return axios
            .create({
                baseURL: DataService.baseURL, //mocked backend
                auth: {
                    username: username,
                    password: pw
                },
                headers: {
                    "Content-type": "application/json"
                }
            })
            .get("/teacher/workshops");
    }

    getWorkshopDetailsTeacher(id, username, pw) {
        return axios
            .create({
                baseURL: DataService.baseURL, //mocked backend
                auth: {
                    username: username,
                    password: pw
                },
                headers: {
                    "Content-type": "application/json"
                }
            })
            .get(`/teacher/workshop/${id}`);
    }

    deleteWorkshopTeacher(id, username, pw) {
        return axios
            .create({
                baseURL: DataService.baseURL, //mocked backend
                auth: {
                    username: username,
                    password: pw
                },
                headers: {
                    "Content-type": "application/json"
                }
            })
            .delete(`/teacher/workshop/${id}`);
    }

    searchStudentsByName(firstname, lastname, username, pw) {
        return axios
            .create({
                baseURL: DataService.baseURL, //mocked backend
                auth: {
                    username: username,
                    password: pw
                },
                headers: {
                    "Content-type": "application/json"
                }
            })
            .request({
                method: "GET",
                url: `/teacher/search/student`,
                params: {
                    firstname: firstname,
                    lastname: lastname
                }
            });
    }

    searchStudentsByGroup(group, username, pw) {
        console.log(username, pw);
        return axios
            .create({
                baseURL: DataService.baseURL, //mocked backend
                auth: {
                    username: username,
                    password: pw
                },
                headers: {
                    "Content-type": "application/json"
                }
            })
            .request({
                method: "GET",
                url: `/teacher/search/student`,
                params: {
                    group: group
                }
            });
    }

    searchStudentByID(id, username, pw) {
        console.log(username, pw);
        return axios
            .create({
                baseURL: DataService.baseURL, //mocked backend
                auth: {
                    username: username,
                    password: pw
                },
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .request({
                method: "GET",
                url: `/teacher/search/student`,
                params: {
                    id: id
                }
            });
    }

    searchStudentALL(username, pw) {
        return axios
            .create({
                baseURL: DataService.baseURL, //mocked backend
                auth: {
                    username: username,
                    password: pw
                },
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .request({
                method: "GET",
                url: `/teacher/search/student`,
                params: {
                    all: true
                }
            });
    }

    addWorkshopTeacher(
        title,
        description,
        deadline,
        is_anonym,
        students,
        criteria,
        username,
        pw
    ) {
        var std = [];

        for (let item of students) {
            std.push(item.id);
        }
        var new_date = new Date(deadline);
        new_date = new_date.toISOString().split(".")[0];
        console.log("Data: " + new_date);
        return axios

            .create({
                baseURL: DataService.baseURL, //mocked backend
                auth: {
                    username: username,
                    password: pw
                },
                headers: {
                    "Content-type": "application/json"
                }
            })
            .post(`/teacher/workshop`, {
                id: "99",
                title: title,
                content: description,
                end: new_date,
                anonymous: is_anonym,
                teachers: [1, 2, 3],
                students: std,
                criteria: criteria
            });
    }

    editWorkshopTeacher(
        id,
        title,
        description,
        deadline,
        is_anonym,
        students,
        criteria,
        username,
        pw
    ) {
        var std = [];

        var new_date = new Date(deadline);
        new_date = new_date.toISOString().split(".")[0];
        console.log("Data: " + new_date);
        console.log("STD: ");
        console.log(students);
        for (let item of students) {
            std.push(item.id);
        }

        return axios
            .create({
                baseURL: DataService.baseURL, //mocked backend
                auth: {
                    username: username,
                    password: pw
                },
                headers: {
                    "Content-type": "application/json"
                }
            })
            .put(`/teacher/workshop/${id}`, {
                title: title,
                content: description,
                end: new_date,
                anonymous: is_anonym,
                teachers: [1, 2, 3],
                students: std,
                criteria: criteria
            });
    }

    getSubmissionTeacher(username, pw, submission_id) {
        return axios
            .create({
                baseURL: DataService.baseURL, //mocked backend
                auth: {
                    username: username,
                    password: pw
                },
                headers: {
                    "Content-type": "application/json"
                }
            })
            .request({
                method: "GET",
                url: `/submission/${submission_id}`
            });
    }

    fileupload(username, pw, file) {
        var bodyFormData = new FormData();
        bodyFormData.append("upload", file);

        return axios
            .post("http://localhost:3000/upload", bodyFormData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                auth: {
                    username: username,
                    password: pw
                }
            })
            .then(function() {
                console.log("SUCCESS!!");
            })
            .catch(function() {
                console.log("FAILURE!!");
            });
    }

    //Student

    getStudentWorkshops(username, pw) {
        return axios
            .create({
                baseURL: DataService.baseURL, //mocked backend
                auth: {
                    username: username,
                    password: pw
                },
                headers: {
                    "Content-type": "application/json"
                }
            })
            .get(`/student/workshops`, {});
    }

    getStudentSubmission(username, pw, id) {
        return axios
            .create({
                baseURL: DataService.baseURL,
                auth: {
                    username: username,
                    password: pw
                },
                headers: {
                    "Content-type": "application/json"
                }
            })
            .get(`/submission/${id}`);
    }

    getStudentTodo(username, pw) {
        return axios
            .create({
                baseURL: DataService.baseURL, //mocked backend
                auth: {
                    username: username,
                    password: pw
                },
                headers: {
                    "Content-type": "application/json"
                }
            })
            .get(`/student/todos`, {});
    }

    getStudentWorkshop(username, pw, id) {
        return axios
            .create({
                baseURL: DataService.baseURL,
                auth: {
                    username: username,
                    password: pw
                },
                headers: {
                    "Content-type": "application/json"
                }
            })
            .get(`/student/workshop/${id}`);
    }

    postSubmissionFile(username, pw, file) {
        return axios.post(DataService.baseURL + "/submission/upload", file, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            auth: {
                username: username,
                password: pw
            }
        });
    }

    getReview(username, pw, id) {
        return axios
            .create({
                baseURL: DataService.baseURL,
                auth: {
                    username: username,
                    password: pw
                },
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .get(`/review/${id}`);
    }

    downloadSubmission(username, pw, id) {
        // Set correct headers
        // See: https://github.com/axios/axios/issues/2548#issuecomment-553434729
        return axios
            .create({
                baseURL: DataService.baseURL,
                auth: {
                    username: username,
                    password: pw
                },
                headers: {
                    "Content-Type": "application/json; application/octet-stream"
                },
                responseType: "blob"
            })
            .get(`submission/download/${id}`);
    }

    writeFile(response, filename) {
        const fileURL = window.URL.createObjectURL(new Blob([response.data]));
        const fURL = document.createElement("a");
        fURL.href = fileURL;
        fURL.setAttribute("download", filename);
        document.body.appendChild(fURL);
        fURL.click();
    }

    addSubmission(username, pw, attachment, title, comment, id) {
        const data = {
            title: title,
            comment: comment,
            attachments: attachment
        };
        return axios.post(DataService.baseURL + "/submission/" + id, data, {
            auth: {
                username: username,
                password: pw
            }
        });
    }

    //Login

    loginUser(username, pw) {
        console.log("LOGIN: " + username + " " + pw);

        return axios
            .create({
                baseURL: DataService.baseURL,
                auth: {
                    username: username,
                    password: pw
                },
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .post("/login", {});
    }

    // eslint-disable-next-line no-unused-vars
    postReview(username, pw, points, feedback, id) {
        const data = {
            feedback: feedback,
            points: points
        };
        console.log(data);
        return axios.put(DataService.baseURL + "/review/" + id, data, {
            auth: {
                username: username,
                password: pw
            }
        });
    }
}

export default new DataService();