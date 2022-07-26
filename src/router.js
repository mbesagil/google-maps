import {createRouter, createWebHistory} from "vue-router";


const routes = [
    {
        path : "/",
        // component : Home
        component : () => import("@/views/HomePage")
    },
    {
        path : "/maps",
        component : () => import("@/views/MapsService")
    }
];

const router = createRouter({
    routes,
    history : createWebHistory()

});

export default router;