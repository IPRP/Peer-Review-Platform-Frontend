// import http from "../http-common";
import axios from "axios";

class DataService {

  static baseURL = "http://localhost:3000";

  getAllWorkshopsTeacher(username, pw) {
    return axios
      .create({
        baseURL: "http://localhost:3000", //mocked backend
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
        baseURL: "http://localhost:3000", //mocked backend
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
        baseURL: "http://localhost:3000", //mocked backend
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
        baseURL: "http://localhost:3000", //mocked backend
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
    return axios
      .create({
        baseURL: "http://localhost:3000", //mocked backend
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
    return axios
      .create({
        baseURL: "http://localhost:3000", //mocked backend
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
          id: id
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

    return axios
      .create({
        baseURL: "http://localhost:3000", //mocked backend
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
        end: deadline,
        anonymous: is_anonym,
        teachers: [1],
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

    for (let item of students) {
      std.push(item.id);
    }

    return axios
      .create({
        baseURL: "http://localhost:3000", //mocked backend
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
        end: deadline,
        anonymous: is_anonym,
        teachers: [1],
        students: std,
        criteria: criteria
      });
  }

  getSubmissionTeacher(username, pw, submission_id) {
    return axios
      .create({
        baseURL: "http://localhost:3000", //mocked backend
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
        baseURL: "http://localhost:3000", //mocked backend
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
        baseURL: "http://localhost:3000",
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
        baseURL: "http://localhost:3000", //mocked backend
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
        baseURL: "http://localhost:3000",
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
    let submission = new FormData();
    submission.append("submission", file);

    return axios
      .post("http://localhost:3000/submission/upload", submission, {
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
        console.log("FAILURE SUBMISSION UPLOAD!!");
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

  //Login

  loginUser(username, pw) {
    return axios
      .create({
        baseURL: "http://localhost:3000", //mocked backend
        auth: {
          username: username,
          password: pw
        },
        headers: {
          "Content-type": "application/json"
        }
      })
      .get(`/login`, {});
  }
}

export default new DataService();
