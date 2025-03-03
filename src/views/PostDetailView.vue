<template>
  <div v-if="post">
    <h1>{{ post.title }}</h1>
    <p>{{ post.content }}</p>
    <p><strong>작성자:</strong> {{ post.user?.name || "알 수 없음" }}</p>
    <p><strong>카테고리:</strong> {{ post.category?.name || "없음" }}</p>
    <p><strong>태그:</strong>
      <span v-for="tag in post.tags" :key="tag.id" class="tag">#{{ tag.name }}</span>
    </p>
  </div>
  <p v-else>게시글을 불러오는 중...</p>
</template>

<script>
import apiClient from "@/api/index.js";

export default {
  data() {
    return {
      post: null,
    };
  },
  async created() {
    const postId = this.$route.params.id;
    try {
      const response = await apiClient.get(`/posts/${postId}`);
      this.post = response.data;
    } catch (error) {
      console.error("게시글을 불러오는 데 실패했습니다.", error);
    }
  },
};
</script>

<style scoped>
.tag {
  background-color: #42b983;
  color: white;
  padding: 5px;
  margin-right: 5px;
  border-radius: 3px;
  font-size: 0.9em;
}
</style>
