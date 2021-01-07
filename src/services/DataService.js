import http from "../http-common";

class DataService {
  getAllWorkshopsT() {
    return http.get("/teacher/workshops");
  }

  getWorkshopDetailT() {
    return http.get(`/teacher/workshops`);
  }

  deleteWorkshopT(id) {
    return http.delete(`/teacher/workshop/${id}`);
  }

  addWorkshopT(title, description, deadline, is_anonym, students, criteria){
    return http.post(`/teacher/workshop`, {
      id: "01",
      title: title,
      beschreibung: description,
      deadline: deadline,
      anonym: is_anonym,
      members: students,
      kriterien: criteria
    });
  }

  editWorkshopT(title, beschreibung, deadline, is_anonym, members) {
    return http.put(`/teacher/workshop`, {
      id: 3,
      title: title,
      beschreibung: beschreibung,
      deadline: deadline,
      anonym: is_anonym,
      members: members,
      submissions: [
        {
          done: [
            {
              rid: 3,
              name: "Georg",
              lated: true
            }
          ],
          open: [
            {
              rid: 1,
              name: "Georg",
              lated: true
            }
          ]
        }
      ],
      reviews: [
        {
          done: [
            {
              sid: 4,
              from: "Lukas",
              to: "Georg"
            }
          ],
          open: [
            {
              sid: 2,
              from: "Lukas",
              to: "Georg"
            }
          ]
        }
      ],
      kriterien: [
        {
          id: 1,
          name: "Kriterium 1 Ja Nein",
          beschreibung: "Beschreibung 1",
          prozent: 0.0,
          punkte: 0.0,
          janein: true
        }
      ]
    });
  }
}

export default new DataService();
