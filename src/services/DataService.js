// import http from "../http-common";
import axios from "axios";

class DataService {
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
