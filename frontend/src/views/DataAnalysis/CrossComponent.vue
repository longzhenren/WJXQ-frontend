<template>
  <div class="cross">
    <div  class="Echarts">
      <div style="width:100%;height:35vh"  id="zhu"></div>
    </div>
  </div>
</template>

<script>
import {request} from "../../network/request";

export default {
  name: "CrossComponent",
  props:{
    xDataID: Number,
    yDataID: Number,
    QuestionIO: Number,
  },
  data(){
    return {
      xAnswerData: [],
      yAnswerData: [],
      xChooseData: [],
      yChooseData: [],
      ShowData: [],
    }
  },
  created() {
    setTimeout(this.getXData,200)
    // setTimeout(this.getYData,200)
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.load_zhu();
    // });
    console.log(this.xDataID)
    console.log(this.yDataID)
  },
  methods: {
    // 显示
    Show(){
      this.$nextTick(() => {
        this.load_zhu();
      });
    },

    load_zhu(){
      let echarts = require('echarts');
      let chartDom = document.getElementById('zhu');
      let myChart = echarts.init(chartDom);
      let option;
      let x=[];
      let y=[];

      for(let i=0;i<this.xChooseData.length;i++){
        x.push(this.xChooseData[i].name)
      }

      for(let i=0;i<this.yChooseData.length;i++){
        y.push(this.yChooseData[i].name)
      }

      for (let i = 0; i < this.xChooseData.length; i++) {
        let xChooseDatum = this.xChooseData[i];
        let ops = {
          name: xChooseDatum.name,
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: []
        }
        for (let j = 0; j < this.yChooseData.length; j++) {
          let yChooseDatum = this.yChooseData[j];
          let count = this.getAnswerNum(this.xDataID,this.yDataID,xChooseDatum.id,yChooseDatum.id)
          ops.data.push(count);
        }
        this.ShowData.push(ops)
      }

      console.log(x)
      console.log(y)
      option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // Use axis to trigger tooltip
            type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
          }
        },
        legend: {
          data: y
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        series: this.ShowData,
        xAxis: {
          type: 'category',
          data: x,
        },
        yAxis: {
          type: 'value',
        },
        // series: [{
        //   data: y,
        //   type: 'bar',
        //   showBackground: true,
        //   label: {
        //     show: true,
        //     position: 'inside'
        //   },
        //   backgroundStyle: {
        //     color: 'rgba(180, 180, 180, 0.2)'
        //   }
        // }]
      };

      option && myChart.setOption(option);

    },


    // 发送两个题目的选项获取作答人数
    getAnswerNum(quesAId,quesBID,choiAID,choiBID){
      console.log('A题',quesAId);
      console.log('B题',quesBID);
      console.log('A选项',choiAID);
      console.log('B选项',choiBID);
      let count = 0;
      let pra = {
        questionAID: quesAId,
        questionBID: quesBID,
        choiceAID: choiAID,
        choiceBID: choiBID,
      }
      request({
        url: '/submit/abc',
        method: 'post',
        data: pra
      }).then(res=>{
        console.log(res)
        if (res.data.Message === 'Success'){
          count =  res.data.count;
          return count
        }
      }).catch(err=>{

      })

      return count

    },

    getXData(){
      console.log('11',this.QuestionIO)
      console.log('22',this.xDataID)
      request({
        url: '/submit/qesrep',
        method: 'post',
        data: {
          // questionnaireID:this.QuestionIO,
          questionID: this.xDataID
        }
      }).then(res=>{
        console.log(res);
        if (res.data.Message !== 'No Such Questionnaire'){
          // this.Questionnaire = res.data.Questionnaire
          // this.QesData=res.data.QesData,
          //     this.ChooseData=res.data.ChooseData,
          //     this.AnswerData=res.data.AnswerData
          this.xChooseData = res.data.ChooseData
          this.xAnswerData = res.data.AnswerData
          console.log(this.xAnswerData)
          this.getYData()
        }
      }).catch(err=>{
        console.log(err)
      })
    },

    getYData(){
      console.log('11',this.QuestionIO)
      console.log('22',this.yDataID)
      request({
        url: '/submit/qesrep',
        method: 'post',
        data: {
          // questionnaireID:this.QuestionIO,
          questionID: this.yDataID
        }
      }).then(res=>{
        console.log(res);
        if (res.data.Message !== 'No Such Questionnaire'){
          // this.Questionnaire = res.data.Questionnaire
          // this.QesData=res.data.QesData,
          //     this.ChooseData=res.data.ChooseData,
          //     this.AnswerData=res.data.AnswerData
          this.yChooseData = res.data.ChooseData
          this.yAnswerData = res.data.AnswerData
          console.log(this.yAnswerData)
          this.Show();
        }
      }).catch(err=>{
        console.log(err)
      })
    }
  },
}
</script>

<style scoped>

</style>