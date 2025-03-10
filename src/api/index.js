import axios from "axios";

// 글로벌 설정 추가
axios.defaults.withCredentials = false;

const apiClient = axios.create({
    baseURL: "http://43.203.118.99:3000",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: false  // 인증 정보 전송 비활성화
});

// 인터셉터에서도 명시적으로 설정
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    // 모든 요청에 withCredentials: false 강제 적용
    config.withCredentials = false;
    return config;
});

export default apiClient;
