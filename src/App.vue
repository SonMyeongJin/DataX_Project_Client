<script>
import apiClient from "./api/index.js";

export default {
  data() {
    return {
      posts: [],
    };
  },
  async created() { // 컴포넌트가 생성될 때 실행
    try {
      const response = await apiClient.get("/posts"); // 백엔드에서 게시글 목록 가져오기
      console.log("API 응답:", response); // 👈 응답 데이터 확인
      this.posts = response.data; // 데이터를 posts 배열에 저장
    } catch (error) {
      console.error("API 요청 실패:", error);
    }
  },
};
</script>

<template>
  <div>
    <h1>게시글 목록</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
    </ul>
  </div>
</template>
