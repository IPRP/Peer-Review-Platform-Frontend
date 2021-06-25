import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueMaterial from "vue-material";
import 'vue-material/dist/vue-material.min.css';
import './style.scss';
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import VueCookies from 'vue-cookies'

Vue.use(VueMaterial);
Vue.use(VueCookies);


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  VueCookies,
  render: h => h(App)
}).$mount("#app");
