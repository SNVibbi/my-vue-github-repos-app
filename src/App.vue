<template>
    <div>
      <NavbarComponent :currentSection="currentSection" @change-section="changeSection" />
      <main class="mt-8">
        <Dashboard :currentSection="currentSection" />
      </main>
    </div>
  </template>
  
  <script>
  import NavbarComponent from './components/Navbar.vue';
  import Dashboard from './views/Dashboard.vue';
  
  export default {
    name: 'App',
    components: {
      NavbarComponent,
      Dashboard
    },
    data() {
      return {
        currentSection: 'home' // Default section to show
      };
    },
    methods: {
      changeSection(section) {
        this.currentSection = section;
      }
    }
  }
  </script>
  
  <style>
  body {
    font-family: 'Arial, sans-serif';
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  </style>
  