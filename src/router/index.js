import { createWebHistory, createRouter } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Scenes from "@/views/Scenes.vue";

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
        path: "/scenes",
        name: "Scenes",
        component: Scenes,
        meta: {
            title: "Scenes"
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
