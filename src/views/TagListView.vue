<template>
  <div>
    <h1>태그: {{ tagName }}</h1>
    <ul v-if="posts.length > 0">
      <li v-for="post in posts" :key="post.id">
        <router-link :to="`/posts/${post.id}`">{{ post.title }}</router-link>
      </li>
    </ul>
    <p v-else>이 태그에 대한 게시글이 없습니다.</p>
  </div>
</template>

<script>
import apiClient from "@/api/index.js";

export default {
  data() {
    return {
      posts: [],
      tagName: ''
    };
  },
  async created() {
    const tagId = this.$route.params.id; // 라우트에서 태그 ID 추출
    try {
      const response = await apiClient.get(`/tags/${tagId}`);
      this.posts = response.data.posts; // API 응답에서 게시글 목록 추출
      this.tagName = response.data.name; // 태그 이름도 저장
    } catch (error) {
      console.error("태그별 게시글을 불러오는 데 실패했습니다.", error);
    }
  }
};
</script>
