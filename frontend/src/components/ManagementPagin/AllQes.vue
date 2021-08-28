<template>
  <div class="allQes">

    <Srh class="srh"></Srh>
    <QesCard class="qesCard" v-for="(questionnaire,i) in closeQes" :QesInfo="closeQes[i]" v-if="(($store.state.manageCurrentState==='状态')||($store.state.manageCurrentState==='未发布'))&&closeQes[i].Title.indexOf($store.state.manageKey)!==-1"></QesCard>
    <QesCard class="qesCard" v-for="(questionnaire,i) in openQes" :QesInfo="openQes[i]" v-if="(($store.state.manageCurrentState==='状态')||($store.state.manageCurrentState==='已发布'))&&openQes[i].Title.indexOf($store.state.manageKey)!==-1"></QesCard>
  </div>
</template>

<script>
import Srh from '@/components/ManagementPagin/common/Search.vue'
import QesCard from "@/components/ManagementPagin/common/QesCard.vue";
import {request} from "../../network/request";

export default {
  name: "AllQes",
  data() {
    return {
      allQesInfo: [],
      openQes: [],
      closeQes: []
    }
  },
  methods: {
    timePos() {
      this.closeQes.sort((a, b) => {
        return a.CreateTime > b.CreateTime ? 1 : -1
      });
      this.openQes.sort((a, b) => {
        return a.CreateTime > b.CreateTime ? 1 : -1
      })
    },
    timeNeg() {
      this.openQes.sort((a, b) => {
        return a.CreateTime < b.CreateTime ? 1 : -1
      });
      this.closeQes.sort((a, b) => {
        return a.CreateTime < b.CreateTime ? 1 : -1
      })
    },
    subPos() {
      this.openQes.sort((a, b) => {
        return a.Submission - b.Submission
      });
      this.closeQes.sort((a, b) => {
        return a.Submission - b.Submission
      })
    },
    subNeg() {
      this.openQes.sort((a, b) => {
        return b.Submission - a.Submission
      });
      this.closeQes.sort((a, b) => {
        return b.Submission - a.Submission
      })
    },
    order() {
      if (this.$store.state.manageCurrentOrder === '时间正序')
        this.timePos();
      else if (this.$store.state.manageCurrentOrder === '时间倒序')
        this.timeNeg();
      else if (this.$store.state.manageCurrentOrder === '答卷正序')
        this.subPos();
      else if (this.$store.state.manageCurrentOrder === '答卷倒序')
        this.subNeg();
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
          if(!this.allQesInfo[i].Remove){
            if (this.allQesInfo[i].Open)
              this.openQes.push(this.allQesInfo[i])
            else
              this.closeQes.push(this.allQesInfo[i])
          }
        }
        this.order();
      })
    }
  },
  components: {
      Srh,
      QesCard,
    },
  created() {
    this.getManageQes()
  }

}

</script>

<style scoped>
.allQes{
  margin-top: 20px;
  margin-left: 30%;
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