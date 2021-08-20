<template>
  <div class="home">
    <SingleChoose/>
  </div>
</template>
<script>
import SingleChoose from "@/components/QuestionTemplates/SingleChoose";
export default {
  components: {SingleChoose}
}
</script>
<script>
// @ is an alias to /src
import SingleChoose from '@/components/QuestionTemplates/SingleChoose'
export default {
  name: 'Home',
  components: {
    SingleChoose
  }
}
</script>
