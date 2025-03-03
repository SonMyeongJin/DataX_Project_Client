<template>
  <div class="home-container">
    <h1>DataX Blog</h1>
    <p>Manage your posts with ease!</p>
    <div class="button-container">
      <router-link class="button" to="/posts">View All Posts</router-link>
      <router-link v-if="isLoggedIn" class="button" to="/posts/new">Write a Post</router-link>
      <router-link v-else class="button" to="/login">Login</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      isLoggedIn: !!localStorage.getItem("token"),
    };
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600;800&display=swap');

.home-container {
  text-align: center;
  margin-top: 50px;
  font-family: "Baloo 2", sans-serif;
}

h1 {
  color: #42b983;
  font-weight: 800;
  font-size: 32px;
}

p {
  font-size: 20px;
  color: #555;
  font-weight: 600;
}

.button-container {
  margin-top: 30px;
}

.button {
  text-decoration: none;
  color: white;
  background-color: #42b983;
  padding: 14px 28px;
  margin: 0 15px;
  border-radius: 25px;
  font-size: 18px;
  font-weight: 700;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 3px 3px 12px rgba(0, 0, 0, 0.1);
}

.button:hover {
  background-color: #36a374;
  transform: scale(1.08);
}
</style>
