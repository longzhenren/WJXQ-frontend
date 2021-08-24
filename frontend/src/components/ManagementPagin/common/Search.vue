<template>
  <div class="search">
    <h3 id="title">问卷列表</h3>
    <el-dropdown @command="handleCommand1" id="order">
      <span class="el-dropdown-link">
        {{order}}<i class="el-icon-arrow-down el-icon--right"></i>
     </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">时间正序</el-dropdown-item>
        <el-dropdown-item command="b">时间倒序</el-dropdown-item>
        <el-dropdown-item command="c">答卷正序</el-dropdown-item>
        <el-dropdown-item command="d">答卷倒序</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dropdown @command="handleCommand2" id="state">
      <span class="el-dropdown-link">
        {{$store.state.manageCurrentState}}<i class="el-icon-arrow-down el-icon--right"></i>
     </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">状态</el-dropdown-item>
        <el-dropdown-item command="b">已发布</el-dropdown-item>
        <el-dropdown-item command="c">未发布</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <input type="text" v-model="key" placeholder="输入问卷名以进行搜索">
    <button class="searchLogo" @click="search"></button>
  </div>
</template>

<script>
export default {
  name: "Search",
  data(){
    return{
      order:'时间正序',
      state:'状态',
      key:''
    }
  },
  methods:{
    handleCommand1(command){
      if(this.$store.state.currentChoose===1){//在所有问卷
        if(command==='a'){
          this.order='时间正序';
          this.$store.commit('manageTimePos')
          this.$parent.timePos();
        }else if(command==='b'){
          this.order='时间倒序'
          this.$store.commit('manageTimeNeg')
          this.$parent.timeNeg();
        }else if(command==='c'){
          this.order='答卷正序'
          this.$store.commit('manageSubPos')
          this.$parent.subPos();
        }else if(command==='d'){
          this.order='答卷倒序';
          this.$store.commit('manageSubNeg')
          this.$parent.subNeg();
        }
      }
      else if(this.$store.state.currentChoose===2){//在星标问卷
        if(command==='a'){
          this.order='时间正序';
          this.$store.commit('manageTimePos')
          this.$parent.timePosStar();
        }else if(command==='b'){
          this.order='时间倒序'
          this.$store.commit('manageTimeNeg')
          this.$parent.timeNegStar();
        }else if(command==='c'){
          this.order='答卷正序'
          this.$store.commit('manageSubPos')
          this.$parent.subPosStar();
        }else if(command==='d'){
          this.order='答卷倒序';
          this.$store.commit('manageSubNeg')
          this.$parent.subNegStar();
        }
      }
    },
    handleCommand2(command){
      if(command==='a'){
        this.state='状态';
        this.$store.commit('manageStateAll');
      }else if(command==='b'){
        this.state='已发布';
        this.$store.commit('manageStateOpen')
      }else if(command==='c'){
        this.state='未发布';
        this.$store.commit('manageStateClose')
      }
    },
    search(){
      this.$store.commit('manageKeySend',this.key)
    }
  }
}
</script>

<style scoped>
#title{
  display: inline-block;
  float: left;
  margin-top: 6px;
}
#order{
  font-size: 10px;
  display: inline-block;
  float: left;
  margin-top: 10px;
  margin-left: 45%;
}
#state{
  font-size: 10px;
  display: inline-block;
  float: left;
  margin-left: 1%;
  margin-top: 10px;
}
input{
  display: inline-block;
  padding-left: 19px;
  float: right;
  height: 35px;
  width: 250px;
  border-radius:18px;
}
button[class=searchLogo]::after{
  position: absolute;
  font-size: 20px;
  line-height: 70px;
  font-family: icomoon;
  content: '\f002';
  top:-20px;
  right: 10px;
}
</style>