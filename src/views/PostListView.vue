<template>
  <div>
    <h1>게시글 목록</h1>
    <input v-model="searchQuery" placeholder="검색할것 입력해주세요" />
    <select v-model="selectedCategory">
      <option value="">모든 카테고리</option>
      <option v-for="category in categories" :key="category.id" :value="category.id">
        {{ category.name }}
      </option>
    </select>
    <button @click="filterPosts">검색</button>
    <ul v-if="filteredPosts.length > 0">
      <li v-for="post in filteredPosts" :key="post.id">
        <router-link :to="`/posts/${post.id}`">{{ post.title }}</router-link>
        <span class="category">[{{ getCategoryName(post.category_id) }}]</span>
      </li>
    </ul>
    <p v-else>게시글이 없습니다.</p>
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
      return category ? category.name : 'Unknown';
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
      this.filteredPosts = filtered; // 검색 결과를 업데이트
    }
  },
  async created() {
    try {
      const response = await apiClient.get("/posts");
      this.posts = response.data;
      this.filteredPosts = this.posts; // 초기 게시글 목록 설정
    } catch (error) {
      console.error("게시글 목록을 불러오는 데 실패했습니다.", error);
    }
  },
};
</script>

<style scoped>
.category {
  color: gray;
  font-size: 0.9em;
}
</style>
