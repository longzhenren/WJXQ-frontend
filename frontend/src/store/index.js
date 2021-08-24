import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    inPer:false,
    currentChoose:1,
    personalInfo:{
      username:'',
      passwd:'',
      email:''
    },
    manageCurrentState:'状态',
    manageCurrentOrder:'时间正序',
    manageKey:'',
    leftMenuCurrent:0
  },
  mutations: {
    login(state,username,passwd){
      window.sessionStorage.setItem('isLogin', 'true');
      state.personalInfo.username=username;
      state.personalInfo.passwd=passwd;
    },
    logout(state){
      window.sessionStorage.clear();
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
    },
    manageStateAll(state){
      state.manageCurrentState='状态';
    },
    manageStateOpen(state){
      state.manageCurrentState='已发布';
    },
    manageStateClose(state){
      state.manageCurrentState='未发布';
    },
    manageKeySend(state,key){
      state.manageKey=key;
    },
    manageTimePos(state){
      state.manageCurrentOrder='时间正序'
    },
    manageTimeNeg(state){
      state.manageCurrentOrder='时间倒序'
    },
    manageSubPos(state){
      state.manageCurrentOrder='答卷正序'
    },
    manageSubNeg(state){
      state.manageCurrentOrder='答卷倒序'
    },
    leftMenuCurrentZero(state){
      state.leftMenuCurrent=0;
    },
    leftMenuCurrentOne(state){
      state.leftMenuCurrent=1;
    },
    leftMenuCurrentTwo(state){
      state.leftMenuCurrent=2;
    }
  },
  actions: {
  },
  modules: {
  }
})
