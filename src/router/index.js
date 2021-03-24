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
            import(/* webpackChunkName: "ReviewVerfassen" */ '../components/student/WriteReview')
      },
      {
        path: 'workshopoverview/:id',
        name: 'workshopoverview',
        component: () =>
            import(/* webpackChunkName: "OffeneWorkshops" */ '../components/student/WorkshopOverview')
      },
      {
        path: 'workshopabgabe/:id',
        name: 'workshopabgabe',
        component: () =>
            import(/* webpackChunkName: "WorkshopAbgabe" */ '../components/student/WorkshopSubmission')
      },
      {
        path: 'studentdashboard',
        component: () =>
            import(/* webpackChunkName: "StudentDashboard" */ '../components/student/StudentDashboard')
      },
      {
        path: 'reviewoverview/:id',
        name: 'reviewoverview',
        component: () =>
            import(/* webpackChunkName: "ReviewOverview" */ '../components/student/ReviewOverview')
      }
    ]
  },
  {
    path: "/teacherdashboard",
    redirect: "teacherdashboard",
    name: "TeacherHome",
    component: TeacherDashboard,
    children : [
      //in the future: path: 'reviewverfassen/:id', same for similar children
      {
        path: 'myworkshops',
        component: () =>
            import(/* webpackChunkName: "StudentDashboard" */ '../components/teacher/MyWorkshops')
      },
      {
        path: 'profile',
        component: () =>
            import(/* webpackChunkName: "StudentDashboard" */ '../components/teacher/Profile')
      },
      {
        path: 'workshopdetail/:id',
        component: () =>
            import(/* webpackChunkName: "StudentDashboard" */ '../components/teacher/WorkshopDetails')
      },
      {
        path: 'newworkshop',
        component: () =>
            import(/* webpackChunkName: "StudentDashboard" */ '../components/teacher/CreateWorkshop')
      },
      {
        path: 'editworkshop/:id',
        component: () =>
            import(/* webpackChunkName: "StudentDashboard" */ '../components/teacher/CreateWorkshop')
      },
      {
        path: '/teacherdashboard',
        component: () =>
            import(/* webpackChunkName: "StudentDashboard" */ '../components/teacher/MyWorkshops')
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
