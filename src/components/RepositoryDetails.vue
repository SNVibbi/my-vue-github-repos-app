<template>
  <div class="container mx-auto p-4">
    <div v-if="loading" class="text-center my-4">Loading...</div>
    <div v-else>
      <h2 class="text-xl font-bold">{{ repo.name }}</h2>
      <p>{{ repo.description }}</p>
      <div>
        <strong>Stars:</strong> {{ formatNumber(repo.stargazers_count) }}
        <strong>Forks:</strong> {{ formatNumber(repo.forks_count) }}
      </div>
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
      repo: {},
      loading: true
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
        this.loading = false;
      } catch (error) {
        console.error('Error fetching repository details:', error);
        this.loading = false;
      }
    },
    formatNumber(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
};
</script>

<style scoped>
</style>
