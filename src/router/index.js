import Vue from "vue";
import VueRouter from "vue-router";
import StudentDashboard from "../views/StudentHome.vue";
import TeacherDashboard from "../views/TeacherHome.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: 'studentdashboard',
    name: "StudentHome",
    component: StudentDashboard,
    children : [
      //in the future: path: 'reviewverfassen/:id', same for similar children
      {
        path: 'reviewverfassen',
        component: () =>
            import(/* webpackChunkName: "ReviewVerfassen" */ '../components/ReviewVerfassen')
      },
      {
        path: 'workshopoverview',
        component: () =>
            import(/* webpackChunkName: "OffeneWorkshops" */ '../components/WorkshopOverview')
      },
      {
        path: 'workshopabgabe',
        component: () =>
            import(/* webpackChunkName: "WorkshopAbgabe" */ '../components/WorkshopAbgabe')
      },
      {
        path: 'studentdashboard',
        component: () =>
            import(/* webpackChunkName: "StudentDashboard" */ '../components/StudentDashboard')
      }
    ]
  },
  {
    path: "/teacher",
    redirect: "teacher",
    name: "TeacherHome",
    component: TeacherDashboard,
    children : [
      //in the future: path: 'reviewverfassen/:id', same for similar children
      {
        path: 'myworkshops',
        component: () =>
            import(/* webpackChunkName: "StudentDashboard" */ '../components/TMyWorkshops.vue')
      },
      {
        path: 'profile',
        component: () =>
            import(/* webpackChunkName: "StudentDashboard" */ '../components/TProfile.vue')
      },
      {
        path: 'workshopdetail/:id',
        component: () =>
            import(/* webpackChunkName: "StudentDashboard" */ '../components/TWorkshopDetail.vue')
      },
      {
        path: 'newworkshop',
        component: () =>
            import(/* webpackChunkName: "StudentDashboard" */ '../components/TNewWorkshop.vue')
      },
      {
        path: 'editworkshop/:id',
        component: () =>
            import(/* webpackChunkName: "StudentDashboard" */ '../components/TEditWorkshop.vue')
      },
      {
        path: '/teacher',
        component: () =>
            import(/* webpackChunkName: "StudentDashboard" */ '../components/TMyWorkshops.vue')
      }
    ]
  },
  {
    path: "*",
    name: "notFound",
    redirect: 'studentdashboard'
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
