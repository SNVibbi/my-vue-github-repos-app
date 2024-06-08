import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import RepositoryDetails from '@/components/RepositoryDetails.vue';
import NotFound from '@/components/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/repository/:id',
    name: 'RepositoryDetails',
    component: RepositoryDetails,
    props: true,
  },
  {
    path: '/:catchAll(.*)*',
    name: 'NotFound',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
