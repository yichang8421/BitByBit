import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Nav from "@/components/Nav.vue";
import Layout from "@/components/Layout.vue";

Vue.config.productionTip = false;

// 全局引入Nav标签
Vue.component("Layout",Layout);
Vue.component("Nav", Nav);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
