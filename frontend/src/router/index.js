import Vue from 'vue'
import VueRouter from 'vue-router'
import CreateQuestion from "../views/CreateQuestionnaire/CreateQuestion";
import QuestionType from "../views/CreateQuestionnaire/QuestionType";
import DesignPage from "../views/DesignQues/DesignPage";
import QuestionnaireRelease from "../views/QuestionnaireRelease/QuestionnaireRelease";
import AnswerQuestionnaire from "../views/AnswerQuestionnaire/AnswerQuestionnaire.vue";
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
  },
  {
    path: '/questype',
    name: 'QuestionType',
    component: QuestionType
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
  {
    path: '/answer/:id',
    name: 'AnswerQuestionnaire',
    component: AnswerQuestionnaire
  },

]

const router = new VueRouter({
  routes
})

export default router
