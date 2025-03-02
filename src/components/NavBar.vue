<template>
  <nav>
    <router-link to="/">홈</router-link>
    <router-link v-if="!isLoggedIn" to="/login">로그인</router-link>
    <button v-if="isLoggedIn" @click="logout">로그아웃</button>
  </nav>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem("token"); // 토큰이 있으면 로그인 상태
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("token"); // 토큰 삭제
      this.$router.push("/login"); // 로그인 페이지로 이동
    },
  },
};
</script>

<style scoped>
nav {
  display: flex;
  gap: 10px;
  padding: 10px;
  background: #f4f4f4;
}
button {
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
