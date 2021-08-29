<template>
<div>
  <div class="InnerDiv" >
    <div >
      <label v-if="QesData.Must==true" style="color: red" >*</label>
      <label>{{QesData.Number}}. {{QesData.Question }}</label>
      <label  style="font-size: 12px;color: darkgrey"> {{QesData.Describe}} </label>
    </div>
    </div>
    <el-table v-if="DataTable=='数据表'"
        :data="ChooseData"
        style="width: 100%"
        stripe
        :default-sort = "{prop: 'number', order: 'descending'}">
      <el-table-column
          prop="number"
          label="序号"
          sortable
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="Choice"
          sortable
          width="180">
      </el-table-column>
      <el-table-column
          prop="value"
          label="数量"
          sortable>
      </el-table-column>
    </el-table>
    <div class="RightDiv">
      <el-checkbox-group v-model="DataTable" class="RightElement" :max="1">
        <el-checkbox-button v-for="data in TableTypes" :label="data" :key="data">{{data}}</el-checkbox-button>
      </el-checkbox-group>
      <el-checkbox-group v-model="Chart" @change="Tab" class="RightElement" :max="1">
        <el-checkbox-button v-for="data in ChartTypes" :label="data" :key="data">{{data}}</el-checkbox-button>
      </el-checkbox-group>
    </div>
    <div  class="Echarts" v-if="Chart=='饼状图'" >
      <div style="width:100%;height:600px" id="pie"></div>
    </div>


    <div  class="Echarts" v-if="Chart=='环形图'" >
      <div style="width:100%;height:600px"  id="circle"></div>
    </div>
    <div  class="Echarts" v-if="Chart=='柱状图'" >
      <div style="width:100%;height:600px"  id="zhu"></div>
    </div>
    <div  class="Echarts" v-if="Chart=='雷达图'" >
      <div style="width:100%;height:600px"  id="Radar"></div>
    </div>
</div>
</template>

<script>
import echarts from "echarts";
import {request} from "@/network/request";

export default {
  name: "ChooseAnalyse",
  data() {
    return {
      QuestionnaireId:0,
      QesId:0,
      QesData:{
        Type: "单选题",
        Question: "This is a Question",
        Describe:"This is a describe",
        Must: true,
        Total: 37
      },
      ChooseData: [],
      BasicData: [],
      AnswerData: [],
      TableTypes:['数据表'],
      DataTable:['数据表'],
      ChartTypes:['饼状图','环形图','柱状图','雷达图'],
      Chart:[],
      pie:true
    }
  },
  props:[
    'id',
    'QuesType',
    'number'
  ],
  methods:{
    Tab:function (type){
      if(type=='饼状图'){
        this.$nextTick(() => {
          this.load_pie();
        });
      }else if(type=='环形图'){
        this.$nextTick(() => {
          this.load_circle();
        });
      }else if(type=='柱状图'){
        this.$nextTick(() => {
          this.load_zhu();
        });
      }else if(type=='雷达图'){
        this.$nextTick(() => {
          this.load_Radar();
        });
      }


      },
    load_pie(){
      let echarts = require('echarts');
      let  chartDom_pie = document.getElementById('pie');

      let  myChart_pie = echarts.init(chartDom_pie);
      window.onresize = function () {
        myChart_pie.resize()
      }
      let  option_pie;
      option_pie = {
        title: {
          text: this.QesData.Question,
          subtext: this.QesData.Describe,
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            name: '选项',
            type: 'pie',
            radius: '50%',
            data: this.ChooseData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      option_pie && myChart_pie.setOption(option_pie);

    },
    load_circle(){
      let echarts = require('echarts');

      let chartDom = document.getElementById('circle');
      let myChart = echarts.init(chartDom);
      let option;

      option = {
        title: {
          text: this.QesData.Question,
          subtext: this.QesData.Describe,
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '10%',
          left: 'left'
        },
        series: [
          {
            name: '选项',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.ChooseData,
          }
        ]
      };

      option && myChart.setOption(option);

    },
    load_zhu(){
      let echarts = require('echarts');

      let chartDom = document.getElementById('zhu');
      let myChart = echarts.init(chartDom);
      let option;
      let x=[];
      let y=[];
      for(let i=0;i<this.ChooseData.length;i++){
        y.push(this.ChooseData[i].value)
      }
      for(let i=0;i<this.ChooseData.length;i++){
        x.push(this.ChooseData[i].name)
      }
      option = {
        xAxis: {
          type: 'category',
          data: x,
        },
        yAxis: {
          type: 'value',
          max:this.QesData.Total,
        },
        series: [{
          data: y,
          type: 'bar',
          showBackground: true,
          label: {
            show: true,
            position: 'inside'
          },
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }]
      };

      option && myChart.setOption(option);

    },
    load_Radar() {
      let echarts = require('echarts');
      let chartDom = document.getElementById('Radar' );
      let myChart = echarts.init(chartDom);
      let option;
      let a=[];
      let b=[];
      let M=0;
      for(let i=0;i<this.ChooseData.length;i++){
        if(this.ChooseData[i].value>M){
          M=this.ChooseData[i].value;
        }
      }
      for(let i=0;i<this.ChooseData.length;i++){
        let temp;
        temp={name:this.ChooseData[i].name,max:M}
        a.push(temp)
      }

      for(let i=0;i<this.ChooseData.length;i++){
        b.push(this.ChooseData[i].value)
      }

      option = {
        title: {
          text: this.QesData.Question
        },
        legend: {
          data: ['选项分布']
        },
        radar: {
          // shape: 'circle',
          indicator:a,
        },
        series: [{
          name: '预算 vs 开销（Budget vs spending）',
          type: 'radar',
          data: [
            {
              value: b,
              name: '选项分布',
              label: {
                show: true,
              },
            },

          ]
        }]
      };

      option && myChart.setOption(option);
    },
    getData(){
      request({
        url: '/submit/qesrep',
        method: 'post',
        data: {
          questionnaireID:this.QuestionnaireId,
          questionNumber: this.Qesid
        }
      }).then(res=>{
        console.log(res);
        if (res.data.Message !== 'No Such Questionnaire'){
          // this.Questionnaire = res.data.Questionnaire
          this.QesData=res.data.QesData,
          this.ChooseData=res.data.ChooseData,
          this.AnswerData=res.data.AnswerData
          this.BasicData = res.data.ChooseData
        }
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  mounted(){
    console.log(this.number)
    console.log(this.id)
    this.Qesid=this.number
    this.QuestionnaireId=this.id;
    setTimeout(this.getData,200)
    // ();
  },
  watch: {
    number(newNumber){
      this.Qesid=newNumber
    },
    id(newId){
      this.QuestionnaireId=newId;
    }
  },

}
</script>

<style scoped>
.RightDiv{
  text-align: right;
}
.RightElement{
  display: inline;
  alignment: right;
  margin-left: 20px;
}
.InnerDiv{
  text-align: left;
  margin-left:10px;
}
</style>