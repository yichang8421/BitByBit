import Vue from "vue";
import VueRouter from "vue-router";
import Money from "@/views/Money.vue";
import Labels from "@/views/Labels.vue";
import Statistics from "@/views/Statistics.vue";
import NotFound from "@/views/NotFound.vue";
import EditLabel from "@/views/EditLabel.vue";
Vue.use(VueRouter);
var routes = [
    {
        path: "/",
        redirect: '/money'
    },
    {
        path: "/money",
        component: Money
    },
    {
        path: "/labels",
        component: Labels
    },
    {
        path: "/statistics",
        component: Statistics
    },
    {
        path: '/labels/edit/:id',
        component: EditLabel
    },
    {
        path: '*',
        component: NotFound
    }
];
var router = new VueRouter({
    routes: routes
});
// tslint:disable-next-line:no-default-export
export default router;
//# sourceMappingURL=index.js.map