<template>
  <div>
    <h2>글쓰기</h2>
    <form @submit.prevent="submitPost">
      <input v-model="title" placeholder="제목" required />
      <textarea v-model="content" placeholder="내용" required></textarea>

      <!-- 카테고리 선택 -->
      <select v-model="category_id" required>
        <option disabled value="">카테고리를 선택하세요</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>

      <!-- 태그 입력 -->
      <input v-model="tags" placeholder="태그 입력 (예: 태그1, 태그2)" />

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
      tags: "", // 태그 입력 데이터
      categories: [
        { id: 1, name: "Life" },
        { id: 2, name: "Game" },
        { id: 3, name: "Food" },
        { id: 4, name: "Love" },
        { id: 5, name: "Faimly" },
      ],
    };
  },
  methods: {
    async submitPost() {
      try {
        const userId = localStorage.getItem("user_id");
        if (!this.category_id) {
          alert("카테고리를 선택해주세요.");
          return;
        }

        const tagsArray = this.tags.split(',').map(tag => tag.trim()); // 태그 문자열을 배열로 변환

        const response = await apiClient.post("/posts", {
          post: {
            title: this.title,
            content: this.content,
            category_id: this.category_id,
            user_id: userId,
            tag_names: tagsArray, // 태그 배열을 서버로 전송
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
