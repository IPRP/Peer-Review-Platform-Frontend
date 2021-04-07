import http from "../http-common";

class DataService {
    getAllWorkshopsTeacher() {
        return http.get("/teacher/workshops");
    }

    getWorkshopDetailsTeacher() {
        return http.get(`/teacher/workshops`);
    }

    deleteWorkshopTeacher(id) {
        return http.delete(`/teacher/workshop/${id}`);
    }

    addWorkshopTeacher(title, description, deadline, is_anonym, students, criteria) {
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

    editWorkshopTeacher(id, title, beschreibung, deadline, is_anonym, members) {
        return http.put(`/teacher/workshop`, {
            id: id,
            title: title,
            beschreibung: beschreibung,
            deadline: deadline,
            anonym: is_anonym,
            members: members,
            submissions: [{
                done: [{
                    rid: 3,
                    name: "Georg",
                    lated: true
                }],
                open: [{
                    rid: 1,
                    name: "Georg",
                    lated: true
                }]
            }],
            reviews: [{
                done: [{
                    sid: 4,
                    from: "Lukas",
                    to: "Georg"
                }],
                open: [{
                    sid: 2,
                    from: "Lukas",
                    to: "Georg"
                }]
            }],
            kriterien: [{
                    id: 1,
                    name: "Kriterium 1 Ja Nein",
                    beschreibung: "Beschreibung 1",
                    prozent: 0.0,
                    punkte: 0.0,
                    janein: true
                },
                {
                    id: 2,
                    name: "Kriterium 2 Punkte",
                    beschreibung: "Beschreibung 2",
                    prozent: 100.0,
                    punkte: 0.0,
                    janein: false
                },
                {
                    id: 3,
                    name: "Kriterium 3 Prozent",
                    beschreibung: "Beschreibung 3",
                    prozent: 0.0,
                    punkte: 100.0,
                    janein: false
                }
            ]
        });
    }
}

export default new DataService();