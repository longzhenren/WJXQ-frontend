<template>
  <div class="recycle">
    <Bin :DeletedQuestionnaires="deleteQes" id="bin"></Bin>
  </div>
</template>

<script>
import Bin from '@/components/ManagementPagin/common/Bin.vue'
import {request} from "../../network/request";
export default {
  name: "Recycle",
  data(){
    return{
      deleteQes:[],
      allQesInfo:[]
    }
  },
  methods:{
    getManageQes(){
      request({
        url: '/question/manageQuestionnaire',
        method: 'post',
        data: {
          'CreateUser': this.$store.state.personalInfo.username,
        }
      }).then(res => {
        console.log(res);
        this.deleteQes=[];
        this.allQesInfo = res.data.Questionnaire;
        for (let i = 0; i < this.allQesInfo.length; i++) {
          if (this.allQesInfo[i].Remove)
            this.deleteQes.push(this.allQesInfo[i])
        }
      })
    }
  },
  components:{
    Bin
  },
  created() {
    this.getManageQes();
  }
}
</script>

<style scoped>
.recycle{
  position: absolute;
  top: 70px;
  right: 15%;
  width: 55%;
  height: 1000px;
}
#bin{
  display: block;
  width: 100%;
}
</style>