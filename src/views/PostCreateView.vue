<template>
  <div>
    <h2>글쓰기</h2>
    <form @submit.prevent="submitPost">
      <input v-model="title" placeholder="제목" required />
      <textarea v-model="content" placeholder="내용" required></textarea>

      <!-- Vue에서 미리 정의한 카테고리 목록 -->
      <select v-model="category_id" required>
        <option disabled value="">카테고리를 선택하세요</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>

      <button type="submit">작성하기</button>
    </form>
  </div>
</template>

<script>
import apiClient from "@/api";

export default {
  data() {
    return {
      title: "",
      content: "",
      category_id: "",
      categories: [
        { id: 1, name: "Life" },
        { id: 2, name: "Game" },
        { id: 3, name: "Food" },
        { id: 4, name: "Love" },
        { id: 5, name: "Faimly" },
      ], // Vue에서 직접 관리하는 카테고리
    };
  },
  methods: {
    async submitPost() {
      try {
        const userId = localStorage.getItem("user_id"); // 로그인한 사용자의 ID 가져오기
        if (!this.category_id) {
          alert("카테고리를 선택해주세요.");
          return;
        }

        const response = await apiClient.post("/posts", {
          post: {
            title: this.title,
            content: this.content,
            category_id: this.category_id, // Vue에서 선택한 카테고리 ID 추가
            user_id: userId, // user_id 추가
          },
        });
        console.log("게시글 작성 성공:", response.data);
        this.$router.push("/"); // 작성 후 홈으로 이동
      } catch (error) {
        console.error("게시글 작성 실패:", error.response.data);
      }
    },
  },
};
</script>

<style scoped>
input, textarea, select {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
}
button {
  background: blue;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}
</style>
