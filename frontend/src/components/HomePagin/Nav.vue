<template>
  <div class="dev">
    <div class="content">
      <img src="../../assets/imgs/logo.png" alt="">
      <a href="" class="connect">联系我们</a>
      <span class="split">|</span>
      <a href="" class="serve">样本服务</a>
    </div>
    <button id="Login" @click="loginClicked" >登陆</button>
    <button id="Register" @click="registerClicked">注册</button>
    <p class="explain">在线写题/不止是摸鱼</p>
    <button class="use" @click="useClicked">免费使用</button>
  </div>
</template>npm

<script>
export default {
  name: "Nav",
  data() {
    return {
    };
  },
  methods:{
    loginClicked(){
        this.$router.push('/Login');
    },
    registerClicked(){
      this.$router.push('/Register');
    },
    useClicked(){
      this.$router.push('/Login')
    }
  }
}
</script>

<style scoped>
@import "../../assets/css/base.css";
@import "../../assets/css/common.css";
.dev{
  float: left;
  background: skyblue;
  height: 100%;
  box-shadow: 5px 5px 2px rgba(192,196,204,0.3);
}
#Login{
  display: inline-block;
  position: absolute;
  width: 80px;
  height: 30px;
  top: 20px;
  background-color: deepskyblue;
  color: white;
  border-radius: 16px;
  right: 20%;
}
#Login:hover{
  background-color: white;
  color: deepskyblue;
}
#Register{
  display: inline-block;
  position: absolute;
  width: 80px;
  height: 30px;
  top: 20px;
  background-color: white;
  color: deepskyblue;
  border-radius: 16px;
  right: 14%;
  border-style: solid;
  border-width: 1px;
  border-color: deepskyblue;
}
#Register:hover{
  background-color: deepskyblue;
  color: white;
}
.content{
  display: inline-block;
  position: absolute;
  left: 15%;
  top: 10px;
}
.connect{
  display: inline-block;
  color: black;
  margin-left: 20px;
}
.serve{
  display: inline-block;
  color: black;
  margin-left: 20px;
}
.split{
  display: inline-block;
  margin-left: 20px;
  font-size: 30px;
}
a:hover{
  color: orange;
}
.explain{
  display: inline-block;
  position: absolute;
  height: 30px;
  font-size: 50px;
  top: 25%;
  font-weight: 800;
  left: 50%;
  margin-left: -200px;
}
.use{
  display: inline-block;
  position: absolute;
  height: 50px;
  width:200px ;
  background-color: orange;
  color: white;
  border-radius: 25px;
  top: 40%;
  left: 50%;
  margin-left: -100px;
  font-size: 25px;
}
</style>