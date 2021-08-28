<template>
  <div class="crossAnalysis">
    <div class="crossTitle">
      <i class="el-icon-rank"></i>
      <span>交叉分析</span>
    </div>
    <div class="crossCondition">
      <div class="setVariable">
        <div class="x">
          <div class="title">自变量X (一般为样本属性)</div>
          <div>
              <select name="xVairableQues" v-model="xVairableQues" autocomplete="off">
<!--                <option selected="selected">添加自变量</option>-->
                <option v-for="(item,index) in Questions" :value="item" selected="selected">{{item.Stem}}</option>
              </select>
          </div>
        </div>

        <div class="y">
          <div class="title">因变量Y (您要分析的目标)</div>
          <div>
              <select name="yVairableQues" v-model="yVairableQues" autocomplete="off">
<!--                <option selected="selected">添加因变量</option>-->
                <option v-for="(item,index) in Questions" :value="item">{{item.Stem}}</option>
              </select>
          </div>
        </div>
      </div>

      <div class="operations">
        <el-button size="mini" round @click="goCrossAnalysis">交叉分析</el-button>
      </div>
    </div>


      <div class="crossContainer" v-if="isShowCross">
        <vue-scroll
            :op="cross">
          <CrossComponent
              :x-data-i-d="xQuesID"
              :y-data-i-d="yQuesID"
              :question-i-o="QuestionnaireId">

          </CrossComponent>

        </vue-scroll>
      </div>

  </div>
</template>

<script>
import {request} from "../../network/request";
import CrossComponent from "./CrossComponent";

export default {
  name: "CrossAnalysis",
  components: {
    CrossComponent
  },
  props: {
    Questions: {
      type: Array,
      default(){
        return [];
      }
    },

    Questionnaire: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data(){
    return {

      cross: {

      },

      QuestionnaireId: '',



      // 是否显示交叉分析组件
      isShowCross: false,

      // Questions: [],

      // 指定为x自变量的题目
      xVairableQues: {
        Stem: '添加自变量'
      },

      xQuesID: 0,

      xAnswerData: [],

      yAnswerData: [],

      // 指定为y因变量的题目
      yVairableQues: {
        Stem: '添加因变量'
      },

      yQuesID: '',
    }
  },
  mounted() {
    // this.yQuesID = this.yVairableQues.id.toString();
    this.QuestionnaireId = this.Questionnaire.id;
  },
  watch: {
    Questionnaire(newQues){
      this.QuestionnaireId = newQues.id;
    }
  },
  methods: {
    // 进行交叉分析
    goCrossAnalysis(){
      this.isShowCross = true
      // this.xQuesID = this.xVairableQues.id.toString();
      // this.yQuesID = this.yVairableQues.id.toString();
      // this.QuestionnaireId = this.Questionnaire.id.toString();
      console.log(this.xVairableQues);
      console.log(this.yVairableQues)
      console.log(this.Questionnaire)
      this.xQuesID = this.xVairableQues.Number
      this.yQuesID = this.yVairableQues.Number
      this.QuestionnaireId = this.Questionnaire.id;
      // setTimeout(this.getXData,100)
      // setTimeout(this.getYData,100)
      // ();
      console.log(this.xQuesID);
      console.log(this.QuestionnaireId)
    },

    // getXData(){
    //   console.log('11',this.QuestionnaireId)
    //   console.log('22',this.yQuesID)
    //   request({
    //     url: '/submit/qesrep',
    //     method: 'post',
    //     data: {
    //       questionnaireID:this.QuestionnaireId,
    //       questionNumber: this.xQuesID
    //     }
    //   }).then(res=>{
    //     console.log(res);
    //     if (res.data.Message !== 'No Such Questionnaire'){
    //       // this.Questionnaire = res.data.Questionnaire
    //       // this.QesData=res.data.QesData,
    //       //     this.ChooseData=res.data.ChooseData,
    //       //     this.AnswerData=res.data.AnswerData
    //       this.xAnswerData = res.data.AnswerData
    //     }
    //   }).catch(err=>{
    //     console.log(err)
    //   })
    // },
    //
    // getYData(){
    //   console.log('11',this.QuestionnaireId)
    //   console.log('22',this.xQuesID)
    //   request({
    //     url: '/submit/qesrep',
    //     method: 'post',
    //     data: {
    //       questionnaireID:this.QuestionnaireId,
    //       questionNumber: this.yQuesID
    //     }
    //   }).then(res=>{
    //     console.log(res);
    //     if (res.data.Message !== 'No Such Questionnaire'){
    //       // this.Questionnaire = res.data.Questionnaire
    //       // this.QesData=res.data.QesData,
    //       //     this.ChooseData=res.data.ChooseData,
    //       //     this.AnswerData=res.data.AnswerData
    //       this.yAnswerData = res.data.AnswerData
    //     }
    //   }).catch(err=>{
    //     console.log(err)
    //   })
    // }
  }
}
</script>

<style scoped>
  .crossAnalysis {
    width: 100%;
    height: 75vh;
    /*background-color: pink;*/
  }

  .crossAnalysis .crossContainer {
    width: 100%;
    height: 35vh;
    /*background-color: red;*/
  }

  .crossAnalysis .crossTitle {
    width: 100%;
    height: 5vh;
    line-height: 5vh;
    text-align: left;
    /*background-color: #42b983;*/
    padding-left: 2vw;
    box-sizing: border-box;
    font-weight: 600;
    letter-spacing: 2px;
    font-family: 'STKaiti',Serif;
    font-size: 14px;
  }

  .crossAnalysis .crossCondition {
    width: 90%;
    margin-top: 1vh;
    height: 30vh;
    margin-left: 2vw;
    border-radius: 5px;
    border: 1px solid #58ACFA;
    background-color: rgba(206,227,246,.3);
    margin-bottom: 5vh;

  }

  .crossAnalysis .crossCondition .operations {
    /*background-color: red;*/
    width: 100%;
    height: 12vh;
    display: flex;
    justify-content: start;
    align-items: center;
    padding-left: 3vw;
  }

  .crossAnalysis .crossCondition .setVariable {
    /*background-color: pink;*/
    width: 100%;
    height: 15vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 30px;
  }

  .crossAnalysis .crossCondition .setVariable .x {
    width: 40%;
    height: 100%;
    /*background-color: #58ACFA;*/
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .crossAnalysis .crossCondition .setVariable .x .title {
    font-size: 14px;
    color: #2E2E2E;
    margin: 5px 0;
    text-align: left;
    font-weight: 600;
  }

  .crossAnalysis .crossCondition .setVariable .x select {
    outline: none;
    /*border: 0;*/
    width: 100%;
    height: 3vh;
    cursor: pointer;
    border: 1px dotted #BDBDBD;
  }

  .crossAnalysis .crossCondition .setVariable .y {
    width: 40%;
    height: 100%;
    /*background-color: #42b983;*/
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .crossAnalysis .crossCondition .setVariable .y .title {
    font-size: 14px;
    color: #2E2E2E;
    margin: 5px 0;
    text-align: left;
    font-weight: 600;
  }

  .crossAnalysis .crossCondition .setVariable .y select {
    outline: none;
    /*border: 0;*/
    width: 100%;
    height: 3vh;
    border: 1px dotted #BDBDBD;
    cursor: pointer;
  }
</style>