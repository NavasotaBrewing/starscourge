import { createWebHistory, createRouter } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";

const routes = [
    {
        path: "/",
        name: "Dashboard",
        component: Dashboard,
        meta: {
            title: "Dashboard"
        }
    },
    {
        path: "/dashboard",
        redirect: "/",
        meta: {
            title: "Dashboard"
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;