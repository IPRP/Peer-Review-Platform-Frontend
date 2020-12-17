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
      //in the future: path: 'reviewverfassen/:id', same for similar children
      {
        path: 'reviewverfassen',
        component: () =>
            import(/* webpackChunkName: "ReviewVerfassen" */ '../components/ReviewVerfassen')
      },
      {
        path: 'offeneworkshops',
        component: () =>
            import(/* webpackChunkName: "OffeneWorkshops" */ '../components/OffeneWorkshops')
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
