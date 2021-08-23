<template>
  <div class="starQes">
    <Srh></Srh>
    <h2>我是星标问卷</h2>
  </div>
</template>

<script>
import Srh from '@/components/ManagementPagin/common/Search.vue'

export default {
  name: "StarQes",
  components:{
    Srh
  }
}
</script>

<style scoped>
.starQes{
  position: absolute;
  top: 70px;
  right: 15%;
  width: 55%;
  background-color: pink;
}
</style>