<template>
  <nav>
    <router-link to="/">홈</router-link>
    <router-link v-if="!isLoggedIn" to="/login">로그인</router-link>
    <button v-if="isLoggedIn" @click="logout">로그아웃</button>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: !!localStorage.getItem("token"), // ✅ 초기 로그인 상태 설정
    };
  },
  created() {
    // ✅ 로그인 상태 변경 이벤트를 감지
    window.addEventListener("storage", this.checkLoginStatus);
  },
  beforeUnmount() {
    // ✅ 컴포넌트가 사라질 때 이벤트 리스너 해제
    window.removeEventListener("storage", this.checkLoginStatus);
  },
  methods: {
    checkLoginStatus() {
      this.isLoggedIn = !!localStorage.getItem("token");
    },
    logout() {
      localStorage.removeItem("token"); // 토큰 삭제
      this.isLoggedIn = false; // ✅ 즉시 상태 반영
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
