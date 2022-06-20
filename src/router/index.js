import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Model from "@/views/Model.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/model",
        name: "Model",
        component: Model
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;