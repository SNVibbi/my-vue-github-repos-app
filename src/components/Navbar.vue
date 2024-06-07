<template>
    <div class="bg-blue-900 text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-xl font-bold">GitHub Repos App</h1>
        <div>
          <button @click="$emit('change-section', 'about')" :class="{'bg-blue-700': currentSection === 'about'}" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2">About</button>
          <button @click="$emit('change-section', 'home')" :class="{'bg-blue-700': currentSection === 'home'}" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"> GitHub Repositories</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NavbarComponent',
    props: {
      currentSection: {
        type: String,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  </style>
  