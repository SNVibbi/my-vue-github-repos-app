
<template>
    <div class="container mx-auto p-4">
      <h2 class="text-xl font-bold">{{ repo.name }}</h2>
      <p>{{ repo.description }}</p>
      <div>
        <strong>Stars:</strong> {{ repo.stargazers_count }}
        <strong>Forks:</strong> {{ repo.forks_count }}
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'RepositoryDetails',
    props: ['id'],
    data() {
      return {
        repo: {}
      };
    },
    mounted() {
      this.fetchRepoDetails();
    },
    methods: {
      async fetchRepoDetails() {
        try {
          const response = await axios.get(`https://api.github.com/repos/SNVibbi/${this.id}`, {
            headers: { Authorization: `Bearer ${process.env.VUE_APP_GITHUB_TOKEN}` }
          });
          this.repo = response.data;
        } catch (error) {
          console.error('Error fetching repository details:', error);
        }
      }
    }
  }
  </script>
  
  <style scoped>
  </style>
  