<template>
    <div class="container mx-auto my-20 text-center">
      <h1 class="text-4xl font-bold mb-4">404 Not Found</h1>
      <p class="text-xl mb-8">Oops! The page you are looking for doesn't exist.</p>
      <router-link to="/" class="text-blue-500 hover:text-blue-700 text-lg">
        Go back to Home
      </router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFound'
  }
  </script>
  
  <style scoped>
  </style>
  