import { createWebHistory, createRouter } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Sandbox from "@/views/Sandbox.vue";

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
    },
    {
        path: "/sand",
        name: "Sandbox",
        component: Sandbox,
        meta: {
            title: "Sandbox"
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
