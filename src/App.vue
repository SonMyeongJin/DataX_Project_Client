<template>
  <div>
    <Navbar /> <!-- ✅ 네비게이션 바 추가 -->
    <router-view /> <!-- ✅ 현재 라우트에 맞는 컴포넌트 표시 -->
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue"; // ✅ Navbar 컴포넌트 가져오기

export default {
  components: {
    Navbar: Navbar, // ✅ 등록
  },
};
</script>

<style scoped>
nav {
  margin-bottom: 20px;
}
</style>
