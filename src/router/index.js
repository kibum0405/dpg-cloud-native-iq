// router/index.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import main from '../components/main.vue';
import step from '../components/spider/step/step.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'main',
    component: main,
  },
  {
    path: '/step',
    name: 'step',
    component: step,
  },
//   {
//     path: '/step2',
//     name: 'step2',
//     component: Step2,
//   },
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;
