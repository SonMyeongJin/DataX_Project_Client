<template>
  <div>
    <h2>로그인</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="이메일" required />
      <input v-model="password" type="password" placeholder="비밀번호" required />
      <button type="submit">로그인</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import apiClient from "@/api/index.js";

export default {
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await apiClient.post("/users/sign_in", {
          user: {
            email: this.email,
            password: this.password,
          },
        });

        const token = response.data.token;
        const userId = response.data.user.id; // 사용자 ID를 응답에서 추출
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId); // 사용자 ID를 로컬 스토리지에 저장

        // storage 이벤트를 발생시켜 Navbar 상태 업데이트
        window.dispatchEvent(new Event("storage"));

        this.$router.push("/"); // 홈으로 이동
      } catch (error) {
        this.errorMessage = "로그인 실패. 이메일 또는 비밀번호를 확인하세요.";
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
