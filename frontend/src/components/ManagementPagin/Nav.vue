<template>
  <div class="dev">
    <img id="logo" @click="backClicked" src="../../assets/imgs/logoPlanet.png">
    <el-popover
      placement="top-start"
      width="180"
      trigger="hover"
      id="myHead">
      <button id="userInfo" @click="perClicked"><span class="userLogo"></span>用户信息</button>
      <button id="logout" @click="logoutClicked"><span class="logoutLogo"></span>退出</button>
      <el-button slot="reference">{{this.$store.state.personalInfo.username}}<span class="downLogo"></span></el-button>
    </el-popover>
  </div>
</template>

<script>
import {request} from "../../network/request";

export default {
  name: "Nav",
  data() {
    return {
    };
  },
  methods:{
    backClicked(){
      this.$store.commit('backClicked')
    },
    perClicked() {
      this.$store.commit('perClicked')
    },
    logoutClicked(){
      if(window.sessionStorage.getItem('isLogin')==='true'){
        this.$store.commit("logout");
        console.log(this.$store.state.personalInfo.username)
        this.$message({
          showClose: true,
          message: '退出成功！',
          type: 'success'
        });
        window.sessionStorage.clear();
        this.$router.push('/Login')
      }else {
        this.$message({
          showClose: true,
          message: '当前未登录',
          type: 'warning'
        });
      }
    },
  }
}
</script>

<style scoped>
@import "../../assets/css/base.css";
@import "../../assets/css/common.css";
.dev{
  position: relative;
  background: skyblue;
  height: 49px;
  box-shadow: 5px 5px 2px rgba(192,196,204,0.3);
}
#userInfo{
  height: 40px;
  width: 150px;
}
#logout{
  height: 40px;
  width: 150px;
  margin-top: 10px;
}
#myHead{
  display: block;
  position: absolute;
  top: 5px;
  right: 15%;
}
#logo{
  display: block;
  position: absolute;
  top: 2px;
  width: 46px;
  height: 46px;
  border-radius: 20px;
  left: 15%;
}
#logo:hover{
  cursor: pointer;
}
span[class=userLogo]::after{
  position: absolute;
  font-size: 20px;
  line-height: 70px;
  vertical-align: middle;
  font-family: icomoon;
  content: '\e968';
  top: -3px;
  left:30px;
}
span[class=logoutLogo]::after{
  position: absolute;
  font-size: 20px;
  line-height: 70px;
  vertical-align: middle;
  font-family: icomoon;
  content: '\e9b6';
  top: 47px;
  left:38px;
}
span[class=downLogo]::after {
  position: absolute;
  font-size: 20px;
  line-height: 70px;
  vertical-align: middle;
  font-family: icomoon;
  content: '\f107';
  top: -35%;
  left: 85%;
}
</style>