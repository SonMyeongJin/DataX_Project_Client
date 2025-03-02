import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";
import PostCreateView from "@/views/PostCreateView.vue"

const routes = [
    { path: "/", component: HomeView },
    { path: "/login", component: LoginView },
    { path: "/signup", component: SignupView },
    { path: "/posts/new", name: "PostCreate", component: PostCreateView }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
