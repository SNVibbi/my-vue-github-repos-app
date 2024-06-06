<template>
    <div class="container mx-auto p-4">
      <div v-if="currentSection === 'home'">
        <h2 class="text-xl font-bold mb-4">My GitHub Repositories</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div v-for="repo in paginatedRepos" :key="repo.id" class="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl text-white">
            <router-link :to="{ name: 'RepositoryDetails', params: { id: repo.name }}" class="text-lg font-semibold text-blue-400 hover:underline">
              {{ repo.name }}
            </router-link>
            <p class="text-sm mt-2">{{ repo.description }}</p>
            <div class="mt-4 flex justify-between items-center text-sm">
              <div>
                <span class="font-bold">Stars:</span> {{ repo.stargazers_count }}
              </div>
              <div>
                <span class="font-bold">Forks:</span> {{ repo.forks_count }}
              </div>
            </div>
            <div class="mt-4 flex justify-between items-center">
              <button @click="deleteRepo(repo.name)" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">Delete</button>
              <router-link :to="{ name: 'RepositoryDetails', params: { id: repo.name }}" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Details</router-link>
            </div>
          </div>
        </div>
        <div class="flex justify-between items-center mt-4">
          <button @click="prevPage" :disabled="currentPage === 1" class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700" :class="{'cursor-not-allowed': currentPage === 1}">Previous</button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages" class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700" :class="{'cursor-not-allowed': currentPage === totalPages}">Next</button>
        </div>
      </div>
  
      <div v-if="currentSection === 'about'">
        <h2 class="text-xl font-bold mb-4">About Me</h2>
        <div class="bg-dark p-6 rounded-lg shadow-lg">
          <div class="flex flex-col md:flex-row items-center">
            <img src="@/assets/vibbi.jpg" alt="Profile" class="w-32 h-32 rounded-full mb-4 md:mb-0 md:mr-6">
            <div>
              <p class="text-lg mb-2">
                Hello, My name is  Simeon Nyakeh Vibbi. I'm a frontend developer with a passion for creating elegant and efficient Web Applications. Welcome to my Github portfolio where you can explore my projects and contributions.
              </p>
              <p class="text-lg">
                Outside of coding, I enjoy watching Anime and photography, constantly exploring the beauty in the world through my lens.
              </p>
            </div>
          </div>
          <div class="mt-6">
            <h3 class="text-lg font-bold mb-2">Hobbies & Interests</h3>
            <div class="flex flex-wrap gap-4">
              <div class="flex items-center bg-gray-200 p-2 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 3a1 1 0 00-.894.553l-7 14A1 1 0 002 19h16a1 1 0 00.894-1.447l-7-14A1 1 0 0010 3zM5 16h10l-5-10-5 10z" clip-rule="evenodd" />
                </svg>
                <span>Anime</span>
              </div>
              <div class="flex items-center bg-gray-200 p-2 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 2a2 2 0 000 4h12a2 2 0 100-4H4zM2 6h16a1 1 0 011 1v10a2 2 0 01-2 2H3a2 2 0 01-2-2V7a1 1 0 011-1z" />
                </svg>
                <span>Photography</span>
              </div>
              <div class="flex items-center bg-gray-200 p-2 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3 2a1 1 0 011-1h12a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V2zm2 15h10V3H5v14z" clip-rule="evenodd" />
                </svg>
                <span>Reading</span>
              </div>
              <div class="flex items-center bg-gray-200 p-2 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414-1.414L9 10.172 7.707 8.879a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span>Cooking</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'DashboardView',
    props: ['currentSection'],
    data() {
      return {
        repos: [],
        currentPage: 1,
        perPage: 8
      };
    },
    computed: {
      paginatedRepos() {
        const start = (this.currentPage - 1) * this.perPage;
        const end = start + this.perPage;
        return this.repos.slice(start, end);
      },
      totalPages() {
        return Math.ceil(this.repos.length / this.perPage);
      }
    },
    mounted() {
      this.fetchRepos();
    },
    methods: {
      async fetchRepos() {
        try {
          const response = await axios.get('/api/users/SNVibbi/repos', {
            headers: { Authorization: `Bearer ${process.env.VUE_APP_GITHUB_TOKEN}` }
          });
          this.repos = response.data;
        } catch (error) {
          console.error('Error fetching repositories:', error);
        }
      },
      async deleteRepo(repoName) {
        try {
          const response = await axios.delete(`/api/repos/SNVibbi/${repoName}`, {
            headers: { Authorization: `Bearer ${process.env.VUE_APP_GITHUB_TOKEN}` }
          });
          
          // Optionally log the response to ensure it's successful
          console.log(response.data);
          
          // Remove the repo from the list if the deletion was successful
          this.repos = this.repos.filter(repo => repo.name !== repoName);
        } catch (error) {
          console.error('Error deleting repository:', error);
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .hover\:underline:hover {
    text-decoration: underline;
  }
  .hover\:bg-red-700:hover {
    background-color: #c53030; /* Darker red for hover */
  }
  .hover\:bg-blue-700:hover {
    background-color: #2b6cb0; /* Darker blue for hover */
  }
  .hover\:bg-gray-700:hover {
    background-color: #4a5568; /* Darker gray for hover */
  }
  .cursor-not-allowed {
    cursor: not-allowed;
  }
  </style>
  