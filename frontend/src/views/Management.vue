<template>
  <div id="management" >
    <Nav></Nav>
    <Left v-if="!$store.state.inPer"></Left>
    <All v-if="this.$store.state.currentChoose===1&&(!$store.state.inPer)"></All>
    <Star v-if="this.$store.state.currentChoose===2&&(!$store.state.inPer)"></Star>
    <Rec v-if="this.$store.state.currentChoose===3&&(!$store.state.inPer)"></Rec>
    <Per v-if="this.$store.state.inPer===true"></Per>
  </div>
</template>

<script>
import Nav from '@/components/ManagementPagin/Nav.vue'
import Per from '@/components/ManagementPagin/PersonalInfo.vue'
import Left from '@/components/ManagementPagin/LeftBox.vue'
import Star from '@/components/ManagementPagin/StarQes.vue'
import Rec from '@/components/ManagementPagin/Recycle.vue'
import All from '@/components/ManagementPagin/AllQes.vue'


export default {
  name: "Management",
  components:{
    Nav,
    Per,
    Left,
    All,
    Rec,
    Star,
  }
}
</script>

<style scoped>
</style>