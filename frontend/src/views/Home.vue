<template>
  <div class="home">
    <Nav></Nav>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/HomePagin/Nav.vue'

export default {
  name: 'Home',
  data(){
    return{

    }
  },
  methods:{
    temp(){
      this.$router.push('/Management');
    }
  },
  components: {
    Nav
  }
}
</script>
