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
      ShowData: [
        {
          name: '',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [320, 302, 301, 334, 390, 330, 320]
        }
      ],
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

      for (let i = 0; i < x.length; i++) {
        let xTotal = 0;
        for (let j = 0; j < this.xAnswerData.length; j++) {

        }
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
        series: [
          {
            name: 'Direct',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [320, 302, 301, 334, 390, 330, 320]
          },
          {
            name: 'Mail Ad',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'Affiliate Ad',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: 'Video Ad',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [150, 212, 201, 154, 190, 330, 410]
          },
          {
            name: 'Search Engine',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [820, 832, 901, 934, 1290, 1330, 1320]
          }
        ],
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

    getXData(){
      console.log('11',this.QuestionIO)
      console.log('22',this.xDataID)
      request({
        url: '/submit/qesrep',
        method: 'post',
        data: {
          questionnaireID:this.QuestionIO,
          questionNumber: this.xDataID
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
          questionnaireID:this.QuestionIO,
          questionNumber: this.yDataID
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