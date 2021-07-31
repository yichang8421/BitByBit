import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Nav from "@/components/Nav.vue";
import Layout from "@/components/Layout.vue";
import Icon from "@/components/Icon.vue";
import tagListModel from "@/models/tagListModel";
import recordListModel from "@/models/recordListModel";

Vue.config.productionTip = false;

// 引入全局标签
Vue.component("Layout", Layout);
Vue.component("Nav", Nav);
Vue.component("Icon", Icon);

// record store
window.recordList = recordListModel.fetch();
window.createRecord = (record: RecordItem) => recordListModel.create(record);

// tag store
window.tagList = tagListModel.fetch();
window.findTag = (id: string) => window.tagList.filter(t => t.id === id)[0];
window.createTag = (name: string) => {
    const message = tagListModel.create(name);
    if (message === "duplicated") {
        window.alert("此标签名已添加");
    }
};
window.removeTag = (id: string) => tagListModel.remove(id);
window.updateTag = (id: string, name: string) => tagListModel.update(id, name);


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
