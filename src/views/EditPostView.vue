<template>
  <div>
    <h1>게시글 수정</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="title">제목</label>
        <input type="text" id="title" v-model="post.title" required>
      </div>
      <div>
        <label for="content">내용</label>
        <textarea id="content" v-model="post.content" required></textarea>
      </div>
      <button type="submit">수정 완료</button>
      <button @click="cancel">취소</button>
    </form>
  </div>
</template>

<script>
import apiClient from "@/api/index.js";

export default {
  data() {
    return {
      post: {
        title: '',
        content: ''
      },
    };
  },
  async created() {
    const postId = this.$route.params.id;
    try {
      const response = await apiClient.get(`/posts/${postId}`);
      this.post = response.data;
    } catch (error) {
      console.error("게시글을 불러오는 데 실패했습니다.", error);
      this.$router.push('/');
    }
  },
  methods: {
    submitForm() {
      apiClient.put(`/posts/${this.$route.params.id}`, this.post)
          .then(() => {
            alert('게시글이 수정되었습니다.');
            this.$router.push({ name: 'PostDetail', params: { id: this.$route.params.id } });
          })
          .catch(error => {
            console.error('게시글 수정 실패:', error);
            alert('게시글 수정에 실패했습니다.');
          });
    },
    cancel() {
      this.$router.go(-1); // 이전 페이지로 돌아가기
    }
  }
};
</script>

<style scoped>
form > div {
  margin-bottom: 20px;
}
label {
  display: block;
  margin-bottom: 5px;
}
input[type="text"], textarea {
  width: 100%;
  padding: 8px;
}
button {
  margin-right: 10px;
}
</style>
