<template>
  <div class="login-container">
    <h2 class="login-title">Login</h2>
    <form @submit.prevent="login" class="login-form">
      <input v-model="email" type="email" placeholder="Enter your email" required class="input-field" />
      <input v-model="password" type="password" placeholder="Enter your password" required class="input-field" />
      <button type="submit" class="login-button">Log In</button>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
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
        const userId = response.data.user.id;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);

        // storage 이벤트를 발생시켜 Navbar 상태 업데이트
        window.dispatchEvent(new Event("storage"));

        this.$router.push("/");
      } catch (error) {
        this.errorMessage = "Login failed. Please check your email and password.";
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.login-title {
  font-size: 24px;
  font-weight: bold;
  color: #42b983;
  margin-bottom: 20px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input-field {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s;
}

.input-field:focus {
  border-color: #42b983;
  outline: none;
}

.login-button {
  background: #42b983;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.login-button:hover {
  background: #36a374;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
