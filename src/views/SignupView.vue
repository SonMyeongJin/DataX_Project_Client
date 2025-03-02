<template>
  <div>
    <h2>회원가입</h2>
    <form @submit.prevent="signup">
      <input v-model="name" type="text" placeholder="이름" required />
      <input v-model="email" type="email" placeholder="이메일" required />
      <input v-model="password" type="password" placeholder="비밀번호" required />
      <input v-model="passwordConfirmation" type="password" placeholder="비밀번호 확인" required />
      <button type="submit">가입하기</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import apiClient from "@/api/index.js";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errorMessage: "",
    };
  },
  methods: {
    async signup() {
      try {
        const response = await apiClient.post("/users", {
          user: {
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.passwordConfirmation,
          },
        });

        const token = response.data.token;
        localStorage.setItem("token", token);

        window.dispatchEvent(new Event("storage"));

        this.$router.push("/"); // 홈으로 이동
      } catch (error) {
        this.errorMessage = "회원가입 실패. 입력값을 확인해주세요.";
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
