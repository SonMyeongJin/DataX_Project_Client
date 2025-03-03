<template>
  <div class="post-container" v-if="post">
    <h1 class="post-title">{{ post.title }}</h1>
    <p class="post-content">{{ post.content }}</p>
    <p class="post-info"><strong>Author:</strong> {{ post.user?.name || "Unknown" }}</p>
    <p class="post-info"><strong>Category:</strong> {{ post.category?.name || "None" }}</p>

    <p class="post-tags">
      <strong>Tags:</strong>
      <span v-for="tag in post.tags" :key="tag.id" class="tag">
        <router-link :to="{ name: 'TagList', params: { id: tag.id } }">
          #{{ tag.name }}
        </router-link>
      </span>
    </p>

    <div class="button-container" v-if="isLoggedIn && isAuthor">
      <button class="edit-btn" @click="editPost">Edit</button>
      <button class="delete-btn" @click="deletePost">Delete</button>
    </div>
  </div>
  <p v-else class="loading-text">Loading post...</p>
</template>

<script>
import apiClient from "@/api/index.js";

export default {
  data() {
    return {
      post: null,
      isLoggedIn: !!localStorage.getItem("token"),
      isAuthor: false
    };
  },
  async created() {
    const postId = this.$route.params.id;
    try {
      const response = await apiClient.get(`/posts/${postId}`);
      this.post = response.data;
      this.checkAuthor();
    } catch (error) {
      console.error("Failed to fetch the post.", error);
    }
  },
  methods: {
    checkAuthor() {
      const userId = localStorage.getItem("userId");
      this.isAuthor = this.post.user.id.toString() === userId;
    },
    editPost() {
      this.$router.push({ name: 'EditPost', params: { id: this.post.id } });
    },
    deletePost() {
      apiClient.delete(`/posts/${this.post.id}`)
          .then(() => {
            alert('Post deleted successfully.');
            this.$router.push({ name: 'Home' });
          })
          .catch(error => {
            console.error('Failed to delete the post:', error);
            alert('Cannot delete the post.');
          });
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600;800&display=swap');

.post-container {
  background: white;
  padding: 30px;
  margin: 30px auto;
  max-width: 700px;
  border-radius: 15px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
  font-family: "Baloo 2", sans-serif;
  text-align: center;
}

.post-title {
  color: #42b983;
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 10px;
}

.post-content {
  font-size: 18px;
  color: #333;
  line-height: 1.6;
  margin-bottom: 20px;
}

.post-info {
  font-size: 16px;
  color: #666;
  margin: 5px 0;
}

.post-tags {
  margin-top: 15px;
  font-size: 16px;
}

.tag {
  background: #ffcc80;
  color: #333;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 14px;
  font-weight: 600;
  margin-right: 5px;
}

.button-container {
  margin-top: 20px;
}

.edit-btn, .delete-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}

.edit-btn {
  background-color: #42b983;
  color: white;
  margin-right: 10px;
}

.edit-btn:hover {
  background-color: #36a374;
}

.delete-btn {
  background-color: #ff6b6b;
  color: white;
}

.delete-btn:hover {
  background-color: #e05252;
}

.loading-text {
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: gray;
}
</style>
