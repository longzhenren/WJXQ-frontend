import Vue from 'vue'
import VueRouter from 'vue-router'
import CreateQuestion from "../views/CreateQuestionnaire/CreateQuestion";
import QuestionType from "../views/CreateQuestionnaire/QuestionType";
import DesignPage from "../views/DesignQues/DesignPage";
import QuestionnaireRelease from "../views/QuestionnaireRelease/QuestionnaireRelease";
import Home from '../views/Home.vue'
import DataAnalysis from "../views/DataAnalysis/DataAnalysis";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: ()=>import('../views/Login.vue')
  },
  {
    path: '/Management',
    name: 'Management',
    component: ()=>import('../views/Management.vue')
  },
  {
    path: '/createques',
    name: 'CreateQuestion',
    component: CreateQuestion
  },
  {
    path: '/questype',
    name: 'QuestionType',
    component: QuestionType
  },
  {
    path: '/dataanalysis',
    name: 'DataAnalysis',
    component: DataAnalysis
  },
  {
    path: '/design',
    name: 'DesignPage',
    component: DesignPage
  },
  {
    path: '/release',
    name: 'QuestionnaireRelease',
    component: QuestionnaireRelease
  },


]

const router = new VueRouter({
  routes
})

export default router
