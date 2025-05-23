// src/router/index.ts

import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'; // Mengimpor HomePage

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home' // Mengarahkan ke /home secara default
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage // Menggunakan HomePage sebagai komponen untuk rute /home
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
