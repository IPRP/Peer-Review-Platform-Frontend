import Vue from "vue";
import VueRouter from "vue-router";
import StudentDashboard from "../views/StudentHome.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: 'studentdashboard',
    name: "StudentHome",
    component: StudentDashboard,
    children : [
      {
        path: 'reviewverfassen',
        component: () =>
            import(/* webpackChunkName: "ErhalteneReviews" */ '../components/ReviewVerfassen')
      },
      {
        path: 'offeneworkshops',
        component: () =>
            import(/* webpackChunkName: "ErhalteneReviews" */ '../components/OffeneWorkshops')
      },
      {
        path: 'workshopabgabe',
        component: () =>
            import(/* webpackChunkName: "ErhalteneReviews" */ '../components/WorkshopAbgabe')
      },
      {
        path: 'studentdashboard',
        component: () =>
            import(/* webpackChunkName: "StudentenHome" */ '../components/StudentDashboard')
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
