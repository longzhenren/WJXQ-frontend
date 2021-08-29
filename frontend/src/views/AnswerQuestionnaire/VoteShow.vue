<template>
  <div class="VoteShow  ">
    <div class="content">
      <h5>您的答卷已经提交，感谢您的参与！</h5>

      <!-- 问题部分 -->
      <el-card class="box-card" v-for="(item, index) in Question">
        <div  >
          <!-- 题号题干 -->
          <span style="font-weight: 800;font-size: 20px;color: gray">{{ item.Stem }}</span>
          <label v-if="item.Type === 1" class="type">[单选题] </label>
          <label v-if="item.Type === 2" class="type">[多选题]</label>
          <!-- 描述 -->
          <div>
            <label style="font-size: 12px; color: darkgrey">
              {{ item.Describe }}
            </label>
          </div>
        </div>

        <!-- 投票题 -->
        <div class="SingleChoice">
          <div v-for="(choice,i) in item.Choice" class="choice">
            <div class="orderOut"><span class="order">{{orderCount(item.Choice,i)[i]}}</span></div>
            <div class="choiceTop">
              <label style="float:left;">{{ choice.name}}</label>
              <label style="float: right"><span style="color: #2eaaff;font-weight: 800">{{choice.value}}</span>&nbsp&nbsp票</label>
              <label></label>
            </div>
            <div class="bar">
              <div class="occupy" :style="{width:percentWith(choice.value,item.Total)+'px'}"></div>
              <label class="percent">{{percent(choice.value,item.Total)}}%</label>
            </div>
          </div>
        </div>

      </el-card>

    </div>
    <div class="bottom">
      <el-link type="info" href="/">问卷星球&nbsp;</el-link>
    </div>
  </div>
</template>

<script>
import { request } from "../../network/request";
export default {
  name: "AnswerQuestionnaire",
  data() {
    return {
      occupyWidth:'',
      ip: "",
      id: this.$route.params.id,
      questionnaireID: 0,
      submissionID: 0,
      Title: "",
      ShowNumber: true,
      Text: "",
      Question: [],
      model:'preview'
    };
  },
  methods: {
    //排序
    sortRule(a, b) {
      return a.Number - b.Number;
    },
    percentWith(a,b){
      return 600*a/b
    },
    percent(a,b){
      return (100*a/b).toFixed(2)
    },
    orderCount(choiceAry,i){
      let j=[];
      j.push(1);
      let index=1;
      let k=1;
      while(index<choiceAry.length){
        if(choiceAry[index].value===choiceAry[index-1].value)
          j.push(k);
        else{
          j.push(index+1);
          k=index+1;
        }
        index++
      }
      return j;
    },
    async getRep(q){
      if (q.Type === 1) {
        console.log(q)
        var c = [];
        request({
          url: '/submit/qesrep',
          method: 'post',
          data: {
            'questionID': q.id,
          }
        }).then(res=>{
          c=res.data.ChooseData.sort((a,b)=>{
            return b.value-a.value
          });
          this.Question.push({
            id: q.id,
            Stem: q.Stem,
            Describe: q.Describe,
            Type: 1,
            Must: q.Must,
            Number: q.Number,
            Choice: c,
            Total:res.data.QesData.Total,
            RadioValue: 0,
          });
        })
      }
      else if (q.Type === 2) {
        var c = [];
        console.log(q)
        request({
          url: '/submit/qesrep',
          method: 'post',
          data: {
            'questionID': q.id,
          }
        }).then(res=>{
          c=res.data.ChooseData.sort((a,b)=>{
            return b.value-a.value
          });
          this.Question.push({
            id: q.id,
            Stem: q.Stem,
            Describe: q.Describe,
            Type: 2,
            MaxChoice: q.MaxChoice,
            Minchoice: q.Minchoice,
            Must: q.Must,
            Number: q.Number,
            Choice: c,
            Total:res.data.QesData.Total,
            CheckList: [],
          });
          console.log(this.Question)
        })
      }
    }
  },

   mounted() {
    //获取客户ip
    this.ip = localStorage.getItem("Ip");
    let  pra;
    if (this.$route.query.Mode===undefined){
      pra = {
        EncodeID: this.id,
        Mode: '',
      }
    }
    else {
      pra = {
        EncodeID: this.id,
        Mode: this.$route.query.Mode,
      }
    }
    //加载问卷
    request({
      url: "/question/answerQuestionnaire",
      method: "post",
      data: pra
    }).then((res) => {
      console.log(res)
        var Questionnaire = res.data.Questionnaire;
        this.Title = Questionnaire.Title;
        this.ShowNumber = Questionnaire.ShowNumber;
        this.Text = Questionnaire.Text;
        this.questionnaireID = Questionnaire.id;
        //对this.Question[]赋值
        for (var i=0;i<Questionnaire.Question.length;i++) {
          var q = Questionnaire.Question[i];
          this.getRep(q)
        }
        this.Question.sort(this.sortRule);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.VoteShow {
  margin-top: 70px;
  margin-left: 25%;
  width: 50%;
  background-color: white;
  text-align: center;
  padding: 30px;
}
.content {
  width: 100%;
  max-width: 800px;
  display: inline-block;
  text-align: center;
}
.box-card {
  text-align: left;
  width: 100%;
  margin: 10px 0 10px 0;
}

.choiceTop{
  display: block;
  height: 15px;
  margin-bottom: 8px;
}
.choice{
  position: relative;
  height: 60px;
  width: 600px;
  font-size: 13px;
  margin-left: 40px;
}
.orderOut{

}
.order{
  position: absolute;
  color: red;
  font-size: 18px;
  left: -25px;
  top: 10px;
}
.type{
  font-size: 5px;
  color: gray;
  float: right;
}
.bar{
  position: relative;
  display: inline-block;
  width: 600px;
  height: 13px;
  background-color: #dddddd;
}
.occupy{
  display: block;
  height: 13px;
  background-color: #2eaaff;
}
.percent{
 font-size: 12px;
  display: block;
  position: absolute;
  right: 0;
  top: 1px;
}
.bottom {
  margin: 20px 10px 20px 10px;
  color: #909399;
}
</style>
