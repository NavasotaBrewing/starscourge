import { createWebHistory, createRouter } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";

const routes = [
    {
        path: "/",
        name: "Dashboard",
        component: Dashboard
    },
    {
        path: "/dashboard",
        redirect: "/"
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;