import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";
import PostCreateView from "@/views/PostCreateView.vue"
import PostListView from "../views/PostListView.vue";
import PostDetailView from "../views/PostDetailView.vue";
import EditPostView from "../views/EditPostView.vue";

const routes = [
    { path: "/", component: HomeView },
    { path: "/login", component: LoginView },
    { path: "/signup", component: SignupView },
    { path: "/posts/new", name: "PostCreate", component: PostCreateView },
    { path: "/posts", component: PostListView },
    { path: "/posts/:id", name: "PostDetail", component: PostDetailView },
    { path: "/posts/edit/:id", name: "EditPost", component: EditPostView, props: true },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
