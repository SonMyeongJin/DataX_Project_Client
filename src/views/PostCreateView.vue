<template>
  <div class="post-container">
    <h2 class="post-title">Write a Post</h2>
    <form @submit.prevent="submitPost" class="post-form">
      <input v-model="title" placeholder="Enter title" required class="input-field" />
      <textarea v-model="content" placeholder="Write your content here" required class="textarea-field"></textarea>

      <select v-model="category_id" required class="select-field">
        <option disabled value="">Select a category</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>

      <input v-model="tags" placeholder="Enter tags ex) Japan,Korea)" class="input-field" />

      <button type="submit" class="submit-button">Post</button>
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
        { id: 5, name: "Family" },
      ],
    };
  },
  methods: {
    async submitPost() {
      try {
        const userId = localStorage.getItem("user_id");
        if (!this.category_id) {
          alert("Please select a category.");
          return;
        }

        const tagsArray = this.tags.split(',').map(tag => tag.trim());

        const response = await apiClient.post("/posts", {
          post: {
            title: this.title,
            content: this.content,
            category_id: this.category_id,
            user_id: userId,
            tag_names: tagsArray,
          },
        });

        console.log("Post created successfully:", response.data);
        this.$router.push("/");
      } catch (error) {
        console.error("Failed to create post:", error.response.data);
      }
    },
  },
};
</script>

<style scoped>
.post-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.post-title {
  font-size: 24px;
  font-weight: bold;
  color: #42b983;
  margin-bottom: 20px;
}

.post-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input-field,
.textarea-field,
.select-field {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s;
}

.input-field:focus,
.textarea-field:focus,
.select-field:focus {
  border-color: #42b983;
  outline: none;
}

.textarea-field {
  height: 120px;
  resize: none;
}

.submit-button {
  background: #42b983;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-button:hover {
  background: #36a374;
}
</style>
