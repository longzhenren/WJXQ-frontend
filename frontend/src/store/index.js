import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin:false,
    inPer:false,
    currentChoose:1,
    personalInfo:{
      username:'',
      passwd:'',
      email:''
    }
  },
  mutations: {
    login(state,username,passwd){
      state.isLogin=true;
      state.personalInfo.username=username;
      state.personalInfo.passwd=passwd;
    },
    logout(state){
      state.isLogin=false;
      state.personalInfo.username=null;
      state.personalInfo.passwd=null;
    },
    getEmail(state,email){
      state.personalInfo.email=email;
    },
    perClicked(state){
      state.inPer=true
    },
    backClicked(state){
      state.inPer=false
    },
    allClicked(state){
      state.currentChoose=1
    },
    starClicked(state){
      state.currentChoose=2
    },
    recClicked(state){
      state.currentChoose=3
    }
  },
  actions: {
  },
  modules: {
  }
})
