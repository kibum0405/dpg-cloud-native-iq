// router/index.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import main from '../components/main.vue';
import Step from '../components/spider/step/Step.vue'

Vue.use(VueRouter);

const routes = [
  {
        path: '/',
        name: 'main',
        component: main,
  },
  {
        path: '/step',
        name: 'Step',
        component: Step,
  },
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;
