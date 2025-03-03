<template>
  <div class="tag-container">
    <h1 class="tag-title">#{{ tagName }}</h1>
    <p v-if="loading">Loading...</p>
    <ul v-else-if="posts.length > 0" class="post-list">
      <li v-for="post in posts" :key="post.id" class="post-item">
        <router-link :to="`/posts/${post.id}`" class="post-link">
          {{ post.title }}
        </router-link>
      </li>
    </ul>
    <p v-else class="no-posts">No posts available for this tag.</p>
  </div>
</template>

<script>
import apiClient from "@/api/index.js";

export default {
  data() {
    return {
      posts: [],
      tagName: '',
      loading: true, // 로딩 상태 추가
    };
  },
  async created() {
    const tagId = this.$route.params.id; // 라우트에서 태그 ID 추출
    try {
      const response = await apiClient.get(`/tags/${tagId}`);
      this.posts = response.data.posts; // API 응답에서 게시글 목록 추출
      this.tagName = response.data.name; // 태그 이름 저장
    } catch (error) {
      console.error("태그별 게시글을 불러오는 데 실패했습니다.", error);
    } finally {
      this.loading = false; // 로딩 완료
    }
  }
};
</script>

<style scoped>
.tag-container {
  text-align: center;
  margin: 50px auto;
  max-width: 600px;
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.tag-title {
  font-size: 24px;
  font-weight: bold;
  color: #42b983;
}

.post-list {
  list-style: none;
  padding: 0;
}

.post-item {
  background: #f9f9f9;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.post-item:hover {
  transform: translateY(-3px);
}

.post-link {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  transition: color 0.3s;
}

.post-link:hover {
  color: #42b983;
}

.no-posts {
  color: #777;
  font-size: 16px;
  margin-top: 20px;
}
</style>
