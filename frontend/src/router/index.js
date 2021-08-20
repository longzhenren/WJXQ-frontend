import Vue from 'vue'
import VueRouter from 'vue-router'
import CreateQuestion from "../views/CreateQuestionnaire/CreateQuestion";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/createques'
  },
  {
    path: '/createques',
    name: 'CreateQuestion',
    component: CreateQuestion
  }

]

const router = new VueRouter({
  routes
})

export default router
