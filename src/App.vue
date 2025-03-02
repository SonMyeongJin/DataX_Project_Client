<template>
  <div>
    <nav>
      <router-link to="/">홈</router-link> |
      <router-link to="/login">로그인</router-link>
    </nav>
    <router-view /> <!-- ✅ 여기에 현재 라우트에 맞는 컴포넌트가 표시됨 -->
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
nav {
  margin-bottom: 20px;
}
nav a {
  margin-right: 10px;
  text-decoration: none;
  color: #42b983;
}
</style>
