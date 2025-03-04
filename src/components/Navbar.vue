<template>
  <nav class="navbar">
    <router-link class="logo" to="/">DataX Blog</router-link>

    <!-- 모바일 전용 / 메뉴바 생성 -->
    <button class="menu-btn" @click="toggleMenu">&#9776;</button>

    <!-- 네비게이션 메뉴 -->
    <div :class="['nav-links', { 'open': isMenuOpen }]">
      <router-link class="nav-link" to="/" @click="closeMenu">Home</router-link>
      <router-link class="nav-link" to="/posts" @click="closeMenu">Posts</router-link>
      <router-link class="nav-link" v-if="isLoggedIn" to="/posts/new" @click="closeMenu">Write</router-link>
      <router-link class="nav-link" v-if="!isLoggedIn" to="/login" @click="closeMenu">Login</router-link>
      <router-link class="nav-link" v-if="!isLoggedIn" to="/signup" @click="closeMenu">Sign Up</router-link>
      <button v-if="isLoggedIn" class="logout-btn" @click="logout">Logout</button>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: !!localStorage.getItem("token"),
      isMenuOpen: false,
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
      this.closeMenu();
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap");

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 20px;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
  color: #007bff;
  text-decoration: none;
}

.menu-btn {
  display: none;
  font-size: 24px;
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
}

.nav-links {
  display: flex;
  gap: 15px;
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

.logout-btn {
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

.logout-btn:hover {
  background-color: #d43f3f;
}

/* 모바일 스타일 - 기본적으로 768px 이하로 작아지면 메뉴바 생기도록 */
@media (max-width: 768px) {
  .menu-btn {
    display: block;
  }

  .nav-links {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 50px;
    right: 15px;
    background: #f9f9f9;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .nav-links.open {
    display: flex;
  }

  .nav-link, .logout-btn {
    width: 100%;
    text-align: center;
  }
}
</style>
