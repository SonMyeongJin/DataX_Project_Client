<template>
  <div class="signup-container">
    <h2 class="signup-title">Create an Account</h2>
    <form @submit.prevent="signup" class="signup-form">
      <div class="form-group">
        <label for="name">Name</label>
        <input v-model="name" type="text" id="name" placeholder="Enter your name" required class="input-field" />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="email" type="email" id="email" placeholder="Enter your email" required class="input-field" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="password" type="password" id="password" placeholder="Enter password more than 6" required class="input-field" />
      </div>
      <div class="form-group">
        <label for="passwordConfirmation">Confirm Password</label>
        <input v-model="passwordConfirmation" type="password" id="passwordConfirmation" placeholder="Confirm your password" required class="input-field" />
      </div>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <button type="submit" class="signup-button">Sign Up</button>
    </form>
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
        this.errorMessage = "Sign-up failed. Please check your inputs.";
      }
    },
  },
};
</script>

<style scoped>
.signup-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.signup-title {
  font-size: 24px;
  font-weight: bold;
  color: #42b983;
  margin-bottom: 20px;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  text-align: left;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
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

.error-message {
  color: red;
  font-size: 14px;
}

.signup-button {
  background: #42b983;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.signup-button:hover {
  background: #36a374;
}
</style>
