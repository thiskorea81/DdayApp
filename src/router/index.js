import { createRouter, createWebHistory } from 'vue-router';
import InputView from '../views/InputView.vue';
import ResultView from '../views/ResultView.vue';
import JungwonView from '../views/JungwonView.vue';
import YeolmaeView from '../views/YeolmaeView.vue';

const routes = [
  {
    path: '/',
    name: 'Input',
    component: InputView
  },
  {
    path: '/result',
    name: 'Result',
    component: ResultView
  },
  {
    path: '/jungwon',
    name: 'Jungwon',
    component: JungwonView
  },
  {
    path: '/yeolmae',
    name: 'Yeolmae',
    component: YeolmaeView
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.BASE_URL),
  routes
});

export default router;