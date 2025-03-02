<template>
  <div class="login-container">
    <h2>로그인</h2>
    <form @submit.prevent="login">
      <div>
        <label for="email">이메일</label>
        <input v-model="email" type="email" id="email" required />
      </div>
      <div>
        <label for="password">비밀번호</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <button type="submit">로그인</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import apiClient from "../api/index.js";

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

        // JWT 토큰 저장
        localStorage.setItem("token", response.data.token);

        // 로그인 성공 후 홈으로 이동
        this.$router.push("/");
      } catch (error) {
        this.errorMessage = "로그인 실패. 이메일 또는 비밀번호를 확인하세요.";
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 300px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
