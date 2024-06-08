<template>
    <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 class="text-2xl font-bold mb-4">Create New Repository</h2>
        <form @submit.prevent="createRepo">
          <div class="mb-4">
            <label for="repoName" class="block text-gray-700">Repository Name</label>
            <input v-model="repoName" id="repoName" type="text" class="w-full px-3 py-2 border rounded-lg" required />
          </div>
          <div class="mb-4">
            <label for="repoDescription" class="block text-gray-700">Description</label>
            <textarea v-model="repoDescription" id="repoDescription" class="w-full px-3 py-2 border rounded-lg" rows="4"></textarea>
          </div>
          <div class="flex justify-end">
            <button type="button" @click="$emit('close')" class="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Create</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CreateRepoModal',
    props: {
      show: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        repoName: '',
        repoDescription: ''
      };
    },
    methods: {
      async createRepo() {
        try {
          this.$emit('create-repo', {
            name: this.repoName,
            description: this.repoDescription
          });
          this.repoName = '';
          this.repoDescription = '';
          this.$emit('close');
        } catch (error) {
          console.error('Error creating repository:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  