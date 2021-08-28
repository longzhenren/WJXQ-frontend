<template>
  <div class="normalReport">
      <ul class="QuesListData" ref="QuesListData">
        <li v-for="(Ques,index) in Questions">
          <div class="DataQuesTitle">
            <span>第{{Ques.Number+1}}题: </span>
            <span>{{ Ques.Stem }}</span>
            <span>[{{Ques.Type}}]</span>
          </div>


<!--          <ChooseAnalyse></ChooseAnalyse>-->
<!--          <div class="DataTable">-->
<!--            &lt;!&ndash;                            原始数据表&ndash;&gt;-->
<!--            <div class="basicData">-->
<!--              <span>原始数据表</span>-->
<!--              <div class="basicDataTable"></div>-->
<!--            </div>-->


<!--            &lt;!&ndash;                            数据分析表&ndash;&gt;-->
<!--            <div class="analysisData">-->
<!--              <span>数据分析结果</span>-->
<!--              <div class="analysisDataTable"></div>-->
<!--            </div>-->
<!--          </div>-->

<!--          <controlList @changeShowState="changeChartState($event,index)"></controlList>-->

          <div class="TableContainer">
            <ChooseAnalyse></ChooseAnalyse>
          </div>

          <el-divider></el-divider>

        </li>

      </ul>
  </div>

</template>

<script>
import controlList from "./controlList";
import ChooseAnalyse from "../../components/DataAnalysis/ChooseAnalyse";


export default {
  name: "DataAnalysisList",
  components:{
    controlList,
    ChooseAnalyse
  },
  props:{
    Questions: {
      type: Array,
      default(){
        return []
      }
    },
    title: String,
  },
  mounted() {
    // console.log(this.FatherNeedShowQuestions)

    this.NeedShowQuestions = this.Questions
    // console.log(this.NeedShowQuestions)
  },
  watch: {
    Questions(newQues){
      // console.log('zhege',this.Questions)
      this.NeedShowQuestions = newQues
    }
  },
  created() {
    // console.log(this.Questionnaire)
    // // console.log(this.FatherNeedShowQuestions)
    // this.NeedShowQuestions = this.Questionnaire.Question
    // console.log(this.NeedShowQuestions)
  },
  data(){
    return {
      NeedShowQuestions: [],
    }
  },
  methods: {
    // 修改问题列表需要展示的图表
    changeChartState(bool,index){
      // console.log(this.NeedShowQuestions)
      // console.log(this.NeedShowQuestions[index])
      this.NeedShowQuestions[index].isShowChart = bool;
    },
  }
}
</script>

<style scoped>
 .normalReport {
  width: 100%;
  /*height: 75vh;*/
  /*background-color: #58ACFA;*/
  padding: 10px;

}


 .QuesListData {
  width: 100%;
   /*75vh*/
   /*height: 75vh;*/
  /*height: 100%;*/
}

  .TableContainer {
  /*background-color: red;*/
  width: 100%;
    padding: 10px 0;
    box-sizing: border-box;
  /*height: 30vh;*/
  /*border-radius: 10px;*/
    box-shadow: 0 0 5px rgba(0,0,0,.4);
  /*border: 1px solid #BDBDBD;*/
  margin: 10px 0;
}


 .normalReport .QuesListData li {
  /*background-color: pink;*/
  width: 100%;
  /*height: 30px;*/
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: start;
}

 .normalReport .QuesListData li .DataTable {
  /*height: 100px;*/
  width: 90%;
  /*background-color: #42b983;*/
}

 .normalReport .QuesListData li .DataTable .basicData {
  /*background-color: pink;*/
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  /*height: 30px;*/
}

 .normalReport .QuesListData li .DataTable .basicData span {
  height: 30px;
  font-size: 16px;
  color: #A4A4A4;
  text-align: left;
  margin-left: 10px;
}

 .normalReport .QuesListData li .DataTable .basicData .basicDataTable {
  height: 100px;
  width: 100%;

}

 .normalReport .QuesListData li .DataTable .analysisData {
  /*background-color: #58ACFA;*/
  width: 100%;
  /*width: 100%;*/
  display: flex;
  flex-direction: column;
  justify-content: start;
}

 .normalReport .QuesListData li .DataTable .analysisData span {
  height: 30px;
  font-size: 16px;
  color: #A4A4A4;
  text-align: left;
  margin-left: 10px;
}

 .normalReport .QuesListData li .DataTable .analysisData .analysisDataTable {
  height: 100px;
  width: 100%;

}


 .normalReport .QuesListData li .DataQuesTitle {
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 10px 0;
}

 .normalReport .QuesListData li .DataQuesTitle span:first-child {
  font-weight: 600;
}

 .normalReport .QuesListData li .DataQuesTitle span:nth-child(2) {
  /*font-weight: 600;*/
  margin-left: 5px;
  margin-right: 5px;
}

 .normalReport .QuesListData li .DataQuesTitle span:nth-child(3) {
  /*font-weight: 600;*/
  font-size: 14px;
  color: #A4A4A4;
}
</style>