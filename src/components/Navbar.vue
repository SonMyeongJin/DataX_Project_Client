<template>
  <nav>
    <router-link class="nav-link" to="/">Home</router-link>
    <router-link class="nav-link" to="/posts">Posts</router-link>
    <router-link class="nav-link" v-if="isLoggedIn" to="/posts/new">Write</router-link>
    <router-link class="nav-link" v-if="!isLoggedIn" to="/login">Login</router-link>
    <router-link class="nav-link" v-if="!isLoggedIn" to="/signup">Sign Up</router-link>
    <button v-if="isLoggedIn" @click="logout">Logout</button>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: !!localStorage.getItem("token"),
    };
  },
  created() {
    window.addEventListener("storage", this.checkLoginStatus);
  },
  beforeUnmount() {
    window.removeEventListener("storage", this.checkLoginStatus);
  },
  methods: {
    checkLoginStatus() {
      this.isLoggedIn = !!localStorage.getItem("token");
    },
    logout() {
      localStorage.removeItem("token");
      this.isLoggedIn = false;
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap");

nav {
  display: flex;
  gap: 15px;
  padding: 12px 20px;
  background: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  align-items: center;
}

.nav-link {
  text-decoration: none;
  font-size: 16px;
  font-family: "Poppins", sans-serif;
  color: #333;
  padding: 10px 15px;
  border-radius: 15px;
  transition: background-color 0.3s, color 0.3s;
}

.nav-link:hover,
.nav-link.router-link-exact-active {
  background-color: #007bff;
  color: white;
}

button {
  font-size: 14px;
  font-family: "Poppins", sans-serif;
  background: #ff4d4d;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 15px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #d43f3f;
}
</style>
