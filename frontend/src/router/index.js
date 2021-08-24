import Vue from 'vue'
import VueRouter from 'vue-router'
import CreateQuestion from "../views/CreateQuestionnaire/CreateQuestion";
import QuestionType from "../views/CreateQuestionnaire/QuestionType";
import DesignPage from "../views/DesignQues/DesignPage";
import QuestionnaireRelease from "../views/QuestionnaireRelease/QuestionnaireRelease";
import Home from '../views/Home.vue'
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
    path: '/answer/:id',
    name: 'AnswerQuestionnaire',
    component: AnswerQuestionnaire
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

// router.beforeEach((to,from,next)=> {
//   // 三个参数：
//    // to 将要访问的路径
//    // from 代表从哪个路径跳转而来
//    // next 是一个函数，表示放行
//    //    next() 放行    next('/login')  强制跳转
//    // 如果用户访问登录页，直接放行
//   if (to.path.indexOf('/answer/')===0){
//     return next();
//   }
//   const item = window.sessionStorage.getItem('token');
//   if (!item){
//     return  next('/login');
//   }
//   next();
// })

export default router
