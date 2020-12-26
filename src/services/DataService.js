import http from "../http-common";

class DataService {
  getAllWorkshopsT() {
    return http.get("/teacher/workshops", {
        auth: {
            username: 'admin',
            password: 'admin'
          }
    });
  }

  getWorkshopDetailT() {
    return http.get(`/teacher/workshops`, {
      auth: {
        username: 'admin',
        password: 'admin'
      }
    });
  }

  deleteWorkshopT(id) {
    return http.delete(`/teacher/workshop/${id}`, {
      auth: {
        username: 'admin',
        password: 'admin'
      }
    });
  }

  update(id, data) {
    return http.put(`/tutorials/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tutorials/${id}`);
  }

  deleteAll() {
    return http.delete(`/tutorials`);
  }

  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }
}

export default new DataService();
