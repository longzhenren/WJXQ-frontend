<template>
  <div class="mk">
    <div class="mainBox">
      <label id="explain">此问卷被设置为需登录才能填写，请先登录</label>
      <button @click="btnClicked" id="toLogin">问卷星球登录</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyMk",
  props:{
    id:''
  },
  methods:{
    btnClicked(){
      window.sessionStorage.setItem('answerQesId',this.id)
      this.$router.push('/Login')
    }
  }
}
</script>

<style scoped>
.mk{
  position:fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .4);
  z-index:998;
}
.mainBox{
  position: fixed;
  top: 50%;
  left: 50%;
  height: 120px;
  width: 400px;
  margin-top: -60px;
  margin-left: -200px;
  border-radius: 5px;
  background-color: white;
}
#explain{
  display: block;
  font-size: 14px;
  margin-top: 28px;
}
#toLogin{
  display: block;
  width: 100px;
  height: 30px;
  margin-top: 12px;
  border-radius: 4px;
  background-color: #2eaaff;
}
</style>