import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import '@mdi/font/css/materialdesignicons.css';


Vue.use(Buefy);
Vue.prototype.$log = console.log;
Vue.config.productionTip = false;


new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
