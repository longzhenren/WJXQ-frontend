<template>
  <div class="starQes">
    <Srh class="srh"></Srh>
    <StarCard class="qesCard" v-for="(questionnaire,i) in closeQes" :QesInfo="closeQes[i]" v-if="(($store.state.manageCurrentState==='状态')||($store.state.manageCurrentState==='未发布'))&&closeQes[i].Title.indexOf($store.state.manageKey)!==-1"></StarCard>
    <StarCard class="qesCard" v-for="(questionnaire,i) in openQes" :QesInfo="openQes[i]" v-if="(($store.state.manageCurrentState==='状态')||($store.state.manageCurrentState==='已发布'))&&openQes[i].Title.indexOf($store.state.manageKey)!==-1"></StarCard>
  </div>
</template>

<script>
import Srh from '@/components/ManagementPagin/common/Search.vue'
import StarCard from '@/components/ManagementPagin/common/StarCard.vue'
import {request} from "../../network/request";

export default {
  name: "StarQes",
  data(){
    return{
      allQesInfo: [],
      openQes: [],
      closeQes: []
    }
  },
  methods:{
    timePosStar() {
      this.closeQes.sort((a, b) => {
        return a.CreateTime > b.CreateTime ? 1 : -1
      });
      this.openQes.sort((a, b) => {
        return a.CreateTime > b.CreateTime ? 1 : -1
      })
    },
    timeNegStar() {
      this.openQes.sort((a, b) => {
        return a.CreateTime < b.CreateTime ? 1 : -1
      });
      this.closeQes.sort((a, b) => {
        return a.CreateTime < b.CreateTime ? 1 : -1
      })
    },
    subPosStar() {
      this.openQes.sort((a, b) => {
        return a.Submission - b.Submission
      });
      this.closeQes.sort((a, b) => {
        return a.Submission - b.Submission
      })
    },
    subNegStar() {
      this.openQes.sort((a, b) => {
        return b.Submission - a.Submission
      });
      this.closeQes.sort((a, b) => {
        return b.Submission - a.Submission
      })
    },
    order() {
      if (this.$store.state.manageCurrentOrder === '时间正序')
        this.timePosStar();
      else if (this.$store.state.manageCurrentOrder === '时间倒序')
        this.timeNegStar();
      else if (this.$store.state.manageCurrentOrder === '答卷正序')
        this.subPosStar();
      else if (this.$store.state.manageCurrentOrder === '答卷倒序')
        this.subNegStar();
    },
    getManageQes(){
      request({
        url: '/question/manageQuestionnaire',
        method: 'post',
        data: {
          'CreateUser': this.$store.state.personalInfo.username,
        }
      }).then(res => {
        this.openQes=[];
        this.closeQes=[];
        this.allQesInfo = res.data.Questionnaire;
        for (let i = 0; i < this.allQesInfo.length; i++) {
          if(this.allQesInfo[i].Star){
            if (this.allQesInfo[i].Open)
              this.openQes.push(this.allQesInfo[i])
            else if(!this.allQesInfo[i].Open)
              this.closeQes.push(this.allQesInfo[i])
          }
        }
        this.order();
      })
    }
  },
  components:{
    Srh,
    StarCard
  },
  created(){
    this.getManageQes()
  }
}
</script>

<style scoped>
.starQes{
  position: absolute;
  top: 70px;
  right: 15%;
  width: 55%;
}
.srh{
  display: block;
  float: top;
  height: 50px;
}
.qesCard{
  display: block;
  float: top;
}
</style>