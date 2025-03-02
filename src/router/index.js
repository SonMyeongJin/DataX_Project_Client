import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";

const routes = [
    { path: "/", component: HomeView },
    { path: "/login", component: LoginView }, // 로그인 페이지 추가
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
