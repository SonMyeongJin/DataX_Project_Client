import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://43.203.118.99:3000",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: false  // 인증 정보 전송 비활성화
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;
