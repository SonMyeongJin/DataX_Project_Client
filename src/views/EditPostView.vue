<template>
  <div class="edit-container">
    <h1 class="edit-title">Edit Post</h1>
    <form @submit.prevent="submitForm" class="edit-form">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="post.title" required class="input-field">
      </div>
      <div class="form-group">
        <label for="content">Content</label>
        <textarea id="content" v-model="post.content" required class="textarea-field"></textarea>
      </div>
      <div class="button-group">
        <button type="submit" class="save-button">Save Changes</button>
        <button type="button" class="cancel-button" @click="cancel">Cancel</button>
      </div>
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
      console.error("Failed to load post:", error);
      this.$router.push('/');
    }
  },
  methods: {
    submitForm() {
      apiClient.put(`/posts/${this.$route.params.id}`, this.post)
          .then(() => {
            alert('Post has been updated.');
            this.$router.push({ name: 'PostDetail', params: { id: this.$route.params.id } });
          })
          .catch(error => {
            console.error('Failed to update post:', error);
            alert('Failed to update post.');
          });
    },
    cancel() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.edit-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.edit-title {
  font-size: 24px;
  font-weight: bold;
  color: #42b983;
  margin-bottom: 20px;
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  text-align: left;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
}

.input-field,
.textarea-field {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s;
}

.input-field:focus,
.textarea-field:focus {
  border-color: #42b983;
  outline: none;
}

.textarea-field {
  height: 150px;
  resize: vertical;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.save-button {
  background: #42b983;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
  flex: 1;
  margin-right: 10px;
}

.save-button:hover {
  background: #36a374;
}

.cancel-button {
  background: #ff5b5b;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
  flex: 1;
}

.cancel-button:hover {
  background: #e04a4a;
}
</style>
