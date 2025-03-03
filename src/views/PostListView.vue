<template>
  <div class="post-container">
    <h1>📚 Explore Posts</h1>

    <!-- 검색 & 필터 -->
    <div class="filter-container">
      <input v-model="searchQuery" placeholder="Search posts..." class="search-input" />
      <select v-model="selectedCategory" class="category-select">
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
      <button @click="filterPosts" class="search-button">🔍 Search</button>
    </div>

    <!-- 게시글 목록 -->
    <ul v-if="filteredPosts.length > 0" class="post-list">
      <li v-for="post in filteredPosts" :key="post.id" class="post-card">
        <router-link :to="`/posts/${post.id}`" class="post-title">
          {{ post.title }}
        </router-link>
        <span class="category-tag">#{{ getCategoryName(post.category_id) }}</span>
      </li>
    </ul>

    <p v-else class="no-posts">No posts found.</p>
  </div>
</template>

<script>
import apiClient from "@/api/index.js";

export default {
  data() {
    return {
      posts: [],
      categories: [
        { id: 1, name: "Life" },
        { id: 2, name: "Game" },
        { id: 3, name: "Food" },
        { id: 4, name: "Love" },
        { id: 5, name: "Family" },
      ],
      selectedCategory: "",
      searchQuery: "",
      filteredPosts: [] // 초기 검색 결과를 보관할 배열
    };
  },
  methods: {
    getCategoryName(categoryId) {
      const category = this.categories.find(c => c.id === categoryId);
      return category ? category.name : "Unknown";
    },
    filterPosts() {
      let filtered = this.posts;
      if (this.selectedCategory) {
        filtered = filtered.filter(post => post.category_id === Number(this.selectedCategory));
      }
      if (this.searchQuery) {
        filtered = filtered.filter(post =>
            post.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            post.content.toLowerCase().includes(this.searchQuery.toLowerCase()));
      }
      this.filteredPosts = filtered;
    }
  },
  async created() {
    try {
      const response = await apiClient.get("/posts");
      this.posts = response.data;
      this.filteredPosts = this.posts;
    } catch (error) {
      console.error("게시글 목록을 불러오는 데 실패했습니다.", error);
    }
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600;800&display=swap');

.post-container {
  text-align: center;
  margin-top: 50px;
  font-family: "Baloo 2", sans-serif;
}

h1 {
  color: #42b983;
  font-weight: 800;
  font-size: 32px;
}

/* 검색 및 필터 */
.filter-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.search-input, .category-select {
  padding: 10px;
  font-size: 16px;
  border-radius: 20px;
  border: 2px solid #42b983;
  outline: none;
  transition: 0.3s;
}

.search-input:focus, .category-select:focus {
  border-color: #36a374;
}

.search-button {
  background-color: #42b983;
  color: white;
  padding: 10px 16px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s, transform 0.2s;
}

.search-button:hover {
  background-color: #36a374;
  transform: scale(1.05);
}

/* 게시글 목록 */
.post-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.post-card {
  background: #f4f4f4;
  padding: 15px;
  margin: 10px 0;
  border-radius: 12px;
  width: 80%;
  max-width: 500px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.post-card:hover {
  transform: scale(1.02);
}

.post-title {
  text-decoration: none;
  font-size: 18px;
  font-weight: 700;
  color: #42b983;
  transition: color 0.3s;
}

.post-title:hover {
  color: #36a374;
}

/* 카테고리 태그 */
.category-tag {
  display: inline-block;
  background-color: #ffcc80;
  color: #333;
  padding: 5px 10px;
  margin-top: 5px;
  border-radius: 15px;
  font-size: 14px;
  font-weight: 600;
}

/* 검색 결과 없음 */
.no-posts {
  font-size: 18px;
  font-weight: 600;
  color: gray;
}
</style>
