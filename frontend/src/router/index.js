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
    component: Home,
    meta: {
      title: '问卷星球'
    }
  },
  {
    path: '/Register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    meta: {
      title: '问卷星球'
    },
    component: resolve=>require(['../views/Register.vue'],resolve)
  },
  {
    path: '/Login',
    name: 'Login',
    meta: {
      title: '问卷星球'
    },
    component: resolve=>require(['../views/Login.vue'],resolve)
  },
  {
    path: '/Management',
    name: 'Management',
    component: resolve=>require(['../views/Management.vue'],resolve),
    meta: {
      title: '问卷星球'
    }
  },
  {
    path: '/questype',
    name: 'QuestionType',
    component:resolve=>require(['../views/CreateQuestionnaire/QuestionType'],resolve),
    meta: {
      title: '问卷星球'
    }
  },
  {
    path: '/dataanalysis',
    name: 'DataAnalysis',
    component: resolve=>require(['../views/DataAnalysis/DataAnalysis'],resolve),
    meta: {
      title: '问卷星球'
    }
  },
  {
    path: '/design',
    name: 'DesignPage',
    component: resolve=>require(['../views/DesignQues/DesignPage'],resolve),
    meta: {
      title: '问卷星球'
    }
  },
  {
    path: '/release',
    name: 'QuestionnaireRelease',
    component: resolve=>require(['../views/QuestionnaireRelease/QuestionnaireRelease'],resolve),
    meta: {
      title: '问卷星球'
    }
  },
  {
    path: '/answer/:id',
    name: 'AnswerQuestionnaire',
    component: resolve=>require(['../views/AnswerQuestionnaire/AnswerQuestionnaire'],resolve),
    meta: {
      title: '问卷星球'
    }
  },
  {
    path: '/VoteShow/:id',
    name: 'VoteShow',
    component: resolve=>require(['../views/AnswerQuestionnaire/VoteShow'],resolve),
    meta: {
      title: '问卷星球'
    }
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next) =>{
  if(to.meta.title){
    document.title = to.meta.title
  }
  next();
})

export default router
