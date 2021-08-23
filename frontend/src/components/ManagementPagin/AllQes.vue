<template>
  <div class="allQes">
    <Srh></Srh>
    <h2>我是所有问卷</h2>
  </div>
</template>

<script>
import Srh from '@/components/ManagementPagin/common/Search.vue'

export default {
  name: "AllQes",
  components:{
    Srh
  }
}
</script>

<style scoped>
.allQes{
  position: absolute;
  top: 70px;
  right: 15%;
  width: 55%;
  background-color: pink;
}
</style>