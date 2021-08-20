<template>
  <button class="createques" @click="">+创建项目</button>
</template>

<script>
export default {
  name: "CreateQuestion",
  methods: {
    CreateNewQue(){
      console.log('to Type')
      this.$router.push('')
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