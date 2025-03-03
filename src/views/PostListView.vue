<template>
  <div>
    <h1>게시글 목록</h1>
    <ul v-if="posts.length > 0">
      <li v-for="post in posts" :key="post.id">
        <router-link :to="`/posts/${post.id}`">{{ post.title }}</router-link>
        <span class="category">[{{ post.category?.name || "카테고리 없음" }}]</span>
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
    };
  },
  async created() {
    try {
      const response = await apiClient.get("/posts"); // 백엔드에서 게시글 목록 가져오기
      this.posts = response.data;
    } catch (error) {
      console.error("게시글 목록을 불러오는 데 실패했습니다.", error);
    }
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
li {
  margin: 10px 0;
}
.category {
  color: gray;
  font-size: 0.9em;
}
</style>
