import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import QuestionType from "../views/CreateQuestionnaire/QuestionType";
import DesignPage from "../views/DesignQues/DesignPage";
import QuestionnaireRelease from "../views/QuestionnaireRelease/QuestionnaireRelease";
import DataAnalysis from "../views/DataAnalysis/DataAnalysis";
import AnswerQuestionnaire from "../views/AnswerQuestionnaire/AnswerQuestionnaire";


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
    component: resolve=>require(['../views/Register.vue'],resolve)
  },
  {
    path: '/Login',
    name: 'Login',
    component: resolve=>require(['../views/Login.vue'],resolve)
  },
  {
    path: '/Management',
    name: 'Management',
    component: resolve=>require(['../views/Management.vue'],resolve)
  },
  {
    path: '/questype',
    name: 'QuestionType',
    component:resolve=>require(['../views/CreateQuestionnaire/QuestionType'],resolve)
  },
  {
    path: '/dataanalysis',
    name: 'DataAnalysis',
    component: resolve=>require(['../views/DataAnalysis/DataAnalysis'],resolve)
  },
  {
    path: '/design',
    name: 'DesignPage',
    component: resolve=>require(['../views/DesignQues/DesignPage'],resolve)
  },
  {
    path: '/release',
    name: 'QuestionnaireRelease',
    component: resolve=>require(['../views/QuestionnaireRelease/QuestionnaireRelease'],resolve)
  },
  {
    path: '/answer/:id',
    name: 'AnswerQuestionnaire',
    component: resolve=>require(['../views/AnswerQuestionnaire/AnswerQuestionnaire'],resolve)
  },
  {
    path: '/VoteShow/:id',
    name: 'VoteShow',
    component: resolve=>require(['../views/AnswerQuestionnaire/VoteShow'],resolve)
  },
]

const router = new VueRouter({
  routes
})

export default router
