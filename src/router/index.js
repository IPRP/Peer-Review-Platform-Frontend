import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Home,
    children: [
      {
        path: "",
        component: Login
      },
      {
        path: "login",
        component: Login
      },
      //in the future: path: 'reviewverfassen/:id', same for similar children
      {
        path: "writereview/:workshopid/:submissionid/:reviewid/:done?",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "ReviewVerfassen" */
            "../components/student/WriteReview"
          )
      },
      {
        path: "workshopoverview/:id",
        name: "workshopoverview",
        component: () =>
          import(
            /* webpackChunkName: "OffeneWorkshops" */
            "../components/student/WorkshopOverview"
          )
      },
      {
        path: "workshopsubmission/:id/:workshopname",
        name: "workshopsubmission",
        component: () =>
          import(
            /* webpackChunkName: "WorkshopAbgabe" */
            "../components/student/WorkshopSubmission"
          )
      },
      {
        path: "studentdashboard",
        component: () =>
          import(
            /* webpackChunkName: "StudentDashboard" */
            "../components/student/StudentDashboard"
          )
      },
      {
        path: "reviewoverview/:id",
        name: "reviewoverview",
        component: () =>
          import(
            /* webpackChunkName: "ReviewOverview" */
            "../components/student/ReviewOverview"
          )
      },
      //in the future: path: 'reviewverfassen/:id', same for similar children
      {
        path: "teacherdashboard",
        component: () =>
          import(
            /* webpackChunkName: "StudentDashboard" */
            "../components/teacher/TeacherDashboard"
          )
      },
      {
        path: "teacherdashboard/profile",
        component: () =>
          import(
            /* webpackChunkName: "StudentDashboard" */
            "../components/teacher/Profile"
          )
      },
      {
        path: "teacherdashboard/workshopdetails/:id",
        component: () =>
          import(
            /* webpackChunkName: "StudentDashboard" */
            "../components/teacher/WorkshopDetails"
          )
      },
      {
        path: "teacherdashboard/createworkshop",
        component: () =>
          import(
            /* webpackChunkName: "StudentDashboard" */
            "../components/teacher/CreateWorkshop"
          )
      },
      {
        path: "teacherdashboard/editworkshop/:id",
        component: () =>
          import(
            /* webpackChunkName: "StudentDashboard" */
            "../components/teacher/EditWorkshop"
          )
      },
      {
        path: "teacherdashboard/workshopdetails/reviews/:id",
        component: () =>
          import(
            /* webpackChunkName: "StudentDashboard" */
            "../components/teacher/Reviews.vue"
          )
      },
      {
        path: "/teacherdashboard",
        component: () =>
          import(
            /* webpackChunkName: "StudentDashboard" */
            "../components/teacher/TeacherDashboard"
          )
      }
    ]
  },
  {
    path: "*",
    name: "notFound",
    redirect: "studentdashboard"
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
