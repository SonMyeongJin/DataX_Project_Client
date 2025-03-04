import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://43.203.118.99:3000", // Rails 서버 주소
    headers: {
        "Content-Type": "application/json",
    },
});

// 요청을 보내기 전에 JWT 토큰이 있으면 헤더에 추가
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;
