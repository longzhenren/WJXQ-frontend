<template>
  <div class="home">
    <div style="width: 100vw;height:100vh">
      <Nav class="nav"></Nav>
      <img class="img" src="../assets/imgs/bg2.jpg" alt="" style="width: 100%; height:100%;">
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/HomePagin/Nav.vue'

export default {
  name: 'Home',
  data(){
    return {
    }
  },
  methods:{
    temp(){
      this.$router.push('/Management');
    }
  },
  components: {
    Nav,
  }
}
</script>
<style scoped>
.nav{
  z-index: 0;
  /*display: inline-block;*/
}
.img{
  z-index: 0;
}
</style>