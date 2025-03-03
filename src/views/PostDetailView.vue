<template>
  <div v-if="post">
    <h1>{{ post.title }}</h1>
    <p>{{ post.content }}</p>
    <p><strong>작성자:</strong> {{ post.user?.name || "알 수 없음" }}</p>
    <p><strong>카테고리:</strong> {{ post.category?.name || "없음" }}</p>
    <p><strong>태그:</strong>
      <span v-for="tag in post.tags" :key="tag.id" class="tag">#{{ tag.name }}</span>
    </p>
    <!-- 수정 및 삭제 버튼 -->
    <button v-if="isLoggedIn && isAuthor" @click="editPost">수정</button>
    <button v-if="isLoggedIn && isAuthor" @click="deletePost">삭제</button>
  </div>
  <p v-else>게시글을 불러오는 중...</p>
</template>

<script>
import apiClient from "@/api/index.js";

export default {
  data() {
    return {
      post: null,
      isLoggedIn: !!localStorage.getItem("token"), // 로그인 상태 체크
      isAuthor: false, // 글쓴이 여부 체크
    };
  },
  async created() {
    const postId = this.$route.params.id;
    try {
      const response = await apiClient.get(`/posts/${postId}`);
      this.post = response.data;
      this.checkAuthor();
    } catch (error) {
      console.error("게시글을 불러오는 데 실패했습니다.", error);
    }
  },
  methods: {
    checkAuthor() {
      const userId = localStorage.getItem("userId"); // 로컬 스토리지에서 사용자 ID 가져오기
      console.log("현재 사용자 ID:", userId); // 디버깅: 현재 로그인한 사용자 ID 출력
      console.log("게시글 작성자 ID:", this.post.user.id); // 디버깅: 게시글 작성자 ID 출력
      this.isAuthor = this.post.user.id.toString() === userId;
      console.log("isAuthor 상태:", this.isAuthor); // 디버깅: isAuthor 상태 출력
    },
    editPost() {
      this.$router.push({ name: 'EditPost', params: { id: this.post.id } });
    },
    deletePost() {
      // 삭제 API 호출
      apiClient.delete(`/posts/${this.post.id}`)
          .then(() => {
            alert('게시글이 삭제되었습니다.');
            this.$router.push({ name: 'Home' });
          })
          .catch(error => {
            console.error('게시글 삭제 실패:', error);
            alert('게시글을 삭제할 수 없습니다.');
          });
    }
  }
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
