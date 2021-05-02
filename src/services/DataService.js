import http from "../http-common";

class DataService {
    getAllWorkshopsTeacher() {
        return http.get("/teacher/workshops");
    }

    getWorkshopDetailsTeacher(id) {
        return http.get(`/teacher/workshop/${id}`);
    }

    deleteWorkshopTeacher(id) {
        return http.delete(`/teacher/workshop/${id}`);
    }

    searchStudentsByName(firstname, lastname) {
        return http.request({
            method: 'GET',
            url: `/teacher/search/student`,
            params: {
                firstname: firstname,
                lastname: lastname
            },
        })
    }

    searchStudentsByGroup(group) {
        return http.get(`/teacher/search/student`, {
            group: group
        });
    }

    addWorkshopTeacher(title, description, deadline, is_anonym, students, criteria) {

        var std = [];

        for(let item of students) {
            std.push(item.id);
        }

        return http.post(`/teacher/workshop`, {
            id: "99",
            title: title,
            content: description,
            end: deadline,
            anonymous: is_anonym,
            teachers: ["lukas"],
            students: std,
            criteria: criteria
        });
    }

    editWorkshopTeacher(id, title, description, deadline, is_anonym, students, criteria) {
        return http.put(`/teacher/workshop/${id}`, {
            title: title,
            content: description,
            end: deadline,
            anonymous: is_anonym,
            teachers: ["lukas"],
            students: students,
            criteria: criteria
        });
    }
}

export default new DataService();