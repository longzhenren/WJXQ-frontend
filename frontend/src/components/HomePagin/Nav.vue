<template>
  <div class="dev">
    <button id="Login" @click="loginClicked" >登陆</button>
    <button id="Register" @click="registerClicked">注册</button>
  </div>
</template>

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
    }
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
#Login{
  display: inline-block;
  position: absolute;
  width: 80px;
  height: 30px;
  top: 10px;
  color: skyblue;
  border-radius: 16px;
  right: 26%;
}
#Register{
  display: inline-block;
  position: absolute;
  width: 80px;
  height: 30px;
  top: 10px;
  color: skyblue;
  border-radius: 16px;
  right: 20%;
}

</style>