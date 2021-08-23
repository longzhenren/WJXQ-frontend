<template>
  <button class="createques" @click="chooseType">+创建项目</button>
</template>

<script>
export default {
  name: "CreateQuestion",
  methods: {
    chooseType(){
      console.log('to Type')
      this.$router.push({
        path: '/questype',
        query: {
          username: this.$store.state.personalInfo.username
        }
      })
    }
  }
}
</script>

<style scoped>
  .createques {
    border: 0;
    background-color: blue;
    width: 10rem;
    height: 3rem;
    font-size: 20px;
    color: white;
    outline: none;
  }
</style>