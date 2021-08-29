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
      count: [],
      xLength: 0,
      yLength: 0,
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
    // 给数组赋值
    setOpts(){
      let k=0;
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
          // console.log('x:',xChooseDatum.id)
          // console.log('y:',yChooseDatum.id)

          // this.getAnswerNum(this.xDataID,this.yDataID,xChooseDatum.id,yChooseDatum.id)
          // console.log('拿到的count',this.count)
          for (let l = 0; l < this.count.length; l++) {
            let countElement = this.count[l];
            if (xChooseDatum.id===countElement.AID && yChooseDatum.id===countElement.BID){
              ops.data.push(countElement.count);
            }
          }
          // k++;
        }
        this.ShowData.push(ops)
      }
      setTimeout(this.Show,200);
      // console.log(this.ShowData)
    },
    // 显示
    Show(){
      this.$nextTick(() => {
        this.load_zhu();
      });
    },

    // 获取交叉数据并计算
    computeCross(){
      for (let i = 0; i < this.xChooseData.length; i++) {
        let xChooseDatum = this.xChooseData[i];
        for (let j = 0; j < this.yChooseData.length; j++) {
          let yChooseDatum = this.yChooseData[j];
          this.getAnswerNum(this.xDataID,this.yDataID,xChooseDatum.id,yChooseDatum.id)
          console.log('拿到的count',this.count)
        }
      }
      // setTimeout(this.Show,200);
    },

    load_zhu(){
      console.log('设置',this.ShowData)
      let echarts = require('echarts');
      let chartDom = document.getElementById('zhu');
      let myChart = echarts.init(chartDom);
      let option;
      let x=[];
      let y=[];

      for(let i=0;i<this.xChooseData.length;i++){
        x.push(this.xChooseData[i].name)
      }
      // this.xLength = this.xChooseData.length

      for(let i=0;i<this.yChooseData.length;i++){
        y.push(this.yChooseData[i].name)
      }
      // console.log(this.ShowData)

      // console.log('x',x)
      // console.log('y',y)

      // console.log('x+ch',this.xChooseData)
      // console.log('y+ch',this.yChooseData)


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
        // series: [
        //   {
        //     name: 'Direct',
        //     type: 'bar',
        //     stack: 'total',
        //     label: {
        //       show: true
        //     },
        //     emphasis: {
        //       focus: 'series'
        //     },
        //     data: [320, 302, 301, 334, 390, 330, 320]
        //   },
        //   {
        //     name: 'Mail Ad',
        //     type: 'bar',
        //     stack: 'total',
        //     label: {
        //       show: true
        //     },
        //     emphasis: {
        //       focus: 'series'
        //     },
        //     data: [120, 132, 101, 134, 90, 230, 210]
        //   },
        //   {
        //     name: 'Affiliate Ad',
        //     type: 'bar',
        //     stack: 'total',
        //     label: {
        //       show: true
        //     },
        //     emphasis: {
        //       focus: 'series'
        //     },
        //     data: [220, 182, 191, 234, 290, 330, 310]
        //   },
        //   {
        //     name: 'Video Ad',
        //     type: 'bar',
        //     stack: 'total',
        //     label: {
        //       show: true
        //     },
        //     emphasis: {
        //       focus: 'series'
        //     },
        //     data: [150, 212, 201, 154, 190, 330, 410]
        //   },
        //   {
        //     name: 'Search Engine',
        //     type: 'bar',
        //     stack: 'total',
        //     label: {
        //       show: true
        //     },
        //     emphasis: {
        //       focus: 'series'
        //     },
        //     data: [820, 832, 901, 934, 1290, 1330, 1320]
        //   }
        // ],
        xAxis: {
          type: 'category',
          data: x,
        },
        yAxis: {
          type: 'value',
        },
      };

      console.log(option)
      option && myChart.setOption(option);
    },


    // 发送两个题目的选项获取作答人数
    getAnswerNum(quesAId,quesBID,choiAID,choiBID){
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
        if (res.data.msg === 'success'){
          let pra = {
            AID: choiAID,
            BID: choiBID,
            count: res.data.count
          }
          this.count.push(pra);
          // console.log(this.count)
          if (this.count.length === this.xLength*this.yLength){
            this.setOpts()
          }
        }
      }).catch(err=>{

      })
      // return this.count

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
        // console.log(res);
        if (res.data.Message !== 'No Such Questionnaire'){
          // this.Questionnaire = res.data.Questionnaire
          // this.QesData=res.data.QesData,
          //     this.ChooseData=res.data.ChooseData,
          //     this.AnswerData=res.data.AnswerData
          this.xChooseData = res.data.ChooseData
          this.xAnswerData = res.data.AnswerData
          // console.log(this.xAnswerData)
          this.xLength = this.xChooseData.length
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
          this.yLength = this.yChooseData.length
          // console.log(this.yAnswerData)
          this.computeCross();
          // this.Show();
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