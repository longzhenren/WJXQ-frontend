<template>
  <div class="dataAnalysis">
    <nav class="topNav">
<!--      切换问卷-->
      <div class="switchQuestionnaire">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            {{ Questionnaire.Title }}(ID:{{Questionnaire.id}} )<i class="el-icon-arrow-down el-icon--right"></i>
          </span>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item  v-for="(Ques,index) in QuestionnaireList">

            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
<!--      数据分析-->
      <div class="analysisTab">
        <ul ref="analys">
          <li @click="changePos(0)" :class="{active: currentPos===0}">
            <div class="icon">
              <img src="../../assets/SVG/pie-chart.svg" alt="数据统计&分析">
            </div>
            <div>统计&分析</div>
          </li>
          <li @click="changePos(1)" :class="{active: currentPos===1}">
            <div class="icon">
              <img src="../../assets/SVG/download.svg" alt="结果下载">
            </div>
            <div>查看下载</div>
          </li>
<!--          <li @click="changePos(2)" :class="{active: currentPos===2}">-->
<!--            <div class="icon">-->
<!--              <img src="../../assets/SVG/stats.svg" alt="答案来源分析">-->
<!--            </div>-->

<!--            <div>答案来源分析</div>-->
<!--          </li>-->
        </ul>
      </div>

<!--      返回首页-->
      <div class="backHome" @click="backToHome">
        <div class="icon">
          <img src="../../assets/SVG/home.svg" alt="">
        </div>

      </div>

<!--      个人信息-->
      <div class="personInfo" >
        <div class="icon">
          <img src="../../assets/SVG/user-tie.svg" alt="用户">
        </div>

        <div>{{ this.$route.query.username }}</div>
      </div>

     </nav>



    <div class="dataAndAnalysis" v-if="currentPos===0">
      <!--    该问卷的题目向导-->
      <div class="QuestionsIndex">

        <div class="switchIndex">
<!--          用于逐题展示题目答卷数据-->
          <div class="Ques" :class="{activeData: switchMode===0}" @click="changeMode(0)">题目分析</div>
<!--            用于展示问卷作答整体情况,比如作答人数\作答方式统计,导出整体作答数据-->
          <div class="Questionnaire" :class="{activeData: switchMode===1}" @click="changeMode(1)">报告分析</div>
        </div>

        <div class="ModesData">

          <div class="QuesModeData" v-if="switchMode===0">
            <vue-scroll ref="vs"
                        :ops="ops" >
              <ul v-if="Questionnaire.Question.length !==0 ">
                <li class="head">问卷题目</li>
                <li v-for="(Ques,index) in  Questionnaire.Question" @click="IndexNav(index)">
                  {{Ques.Number+1}}. {{ Ques.Stem }}
                </li>
              </ul>
              <div v-else>
                <el-empty description="题目列表为空" v-if="Questionnaire.Question.length===0"></el-empty>
              </div>
            </vue-scroll>
          </div>

          <div class="QuestionnaireModeData" v-else>

          </div>


        </div>
      </div>


      <div class="AnalysisPage" ref="AnalysisPage">
        <div class="QuestionsIndexAnalysis" v-if="switchMode===0">
          <el-tabs type="border-card" @tab-click="isShowQuick">
            <el-tab-pane name="0">
              <span slot="label">
                <i class="el-icon-s-order"></i> 标准报告
              </span>
<!--              标准报告-->

              <div class="normalReport">
                <vue-scroll ref="vs2"
                            :ops="ops2" >
                  <div class="DataReportTitle">
                    <div>标准报告</div>
  <!--                  标准报告-->
                  </div>

                  <el-divider></el-divider>

                  <el-empty description="暂无数据" v-if="Questionnaire.Question.length===0"></el-empty>

                  <DataAnalysisList v-else
                      :questions="Questionnaire.Question"
                    :father-need-show-questions="NeedShowQuestions"></DataAnalysisList>
                </vue-scroll>


              </div>


            </el-tab-pane>

            <el-tab-pane name="1">
              <span slot="label">
                <i class="el-icon-s-grid"></i> 分类筛查
              </span>
              <classification :questions="Questionnaire.Question"></classification>
            </el-tab-pane>

            <el-tab-pane name="2">
              <span slot="label">
                <i class="el-icon-s-data"></i> 交叉统计
              </span>
<!--              交叉统计-->
              <CrossAnalysis
              :questions="Questionnaire.Question"></CrossAnalysis>
            </el-tab-pane>
          </el-tabs>

          <div class="quickNav" v-if="isShowQuickNav">
            <div class="toTop" @click="ToTop">
              <i class="el-icon-caret-top"></i>
              <div>回顶</div>
            </div>
            <div class="download">
              <i class="el-icon-download"></i>
              <div>报告</div>
            </div>
            <div class="toBottom" @click="ToBottom">
              <i class="el-icon-caret-bottom"></i>
              <div>到底</div>
            </div>
          </div>


        </div>


<!--        <div class="AnswerTable" v-else-if="switchMode===1">-->

<!--        </div>-->
      </div>
    </div>

    <div class="AnswerTable" v-else-if="currentPos===1">
      <div class="AnswerNav">
        原始答卷数据
      </div>


      <div class="Answers">
        原始答卷数据表
      </div>
    </div>



<!--    问卷基本信息-->
    <div class="QuesBase">

    </div>

  </div>
</template>

<script>
  import {request} from "../../network/request";
import classification from "./classification";
import DataAnalysisList from "./DataAnalysisList";
import CrossAnalysis from "./CrossAnalysis";

  export default {
    name: "DataAnalysis",
    components: {
      classification,
      DataAnalysisList,
      CrossAnalysis
    },
    updated() {
        // this.updateHTMLHeight();
      // this.changeChart()
      // this.isShowQuick()
    },
    methods:{

      // // 判断是否显示固定菜单
      isShowQuick(tab,event){
          // this.isShowQuickNav = true

        // else
        if (tab.name === '0'){
          this.isShowQuickNav = true
        }
        else {
          this.isShowQuickNav = false
        }


      },

      // NotShowQuick(){
      //   console.log( this.isShowQuickNav)
      //   this.isShowQuickNav = false
      // },

      // 回到顶部
      ToTop(){
        this.$refs.vs2.scrollTo({
              y: 0
            },
            500,
            "easeInQuad"
        )
      },


      // 到底
      ToBottom(){
        let length = this.Questionnaire.Question.length;
        this.IndexNav(length-1)
      },


      // 快速导航
      IndexNav(index){
        let QuesItems = document.querySelector(".QuesListData").children;
        let height = 0;
        // for (let i = 0; i < index; i++) {
        //   height+=QuesItems[i].clientHeight;
        // }
        if (QuesItems){
          height = QuesItems[index].offsetTop
          // height-=10*index;
          // height -= 8;
          this.$refs.vs2.scrollTo({
                y: height
              },
              500,
              "easeInQuad"
          )
        }


      },

      // 修改问题列表需要展示的图表
      changeChartState(bool,index){
        this.NeedShowQuestions[index].isShowChart = bool;
      },


      // 切换模式
      changeMode(index) {
        this.switchMode = index
      },
      // 切换顶部导航栏
      changePos(index){
        this.currentPos = index
      },


      // 回到管理页面
      backToHome(){
        this.$router.push({
          path: '/Management',
          query: {
            username: this.$route.query.username
          }
        })
      },

      // 调整问卷格式
      adjustDataStruct(Questionnaire){
        let Ques = {
          id: Questionnaire.id,
          Title: Questionnaire.Title,
          // CreateUser: '',
          CreateTime: Questionnaire.CreateTime,
          UpdateTime: Questionnaire.UpdateTime,
          ReleaseTime: Questionnaire.ReleaseTime ,
          ShowNumber: Questionnaire.ShowNumber,
          Open: Questionnaire.Open,
          Text: Questionnaire.Text,
          Question: [],
          EncodeID: Questionnaire.EncodeID
        }

        let Questions = Questionnaire.Question.sort(function(a,b){
          return a.Number - b.Number;
        });


        this.NeedShowQuestions = [];
        for (let i = 0; i < Questions.length; i++) {
          let questionItem = Questions[i];
          // console.log(questionItem)
          questionItem.isShowChart = false;
          switch (questionItem.Type) {
            case 1:
              questionItem.typeTitle = '单选题'
                  break;
            case 2:
              questionItem.typeTitle = '单选题'
              break;
            case 3:
              questionItem.typeTitle = '单选题'
              break;
            case 4:
              questionItem.typeTitle = '单选题'
              break;

          }
          this.NeedShowQuestions.push(questionItem)
        }
        // console.log(this.QuesList)
        Ques.Question = this.NeedShowQuestions
        this.Questionnaire = Ques
        // console.log(Questionnaire);
      },

      // 获取当前问卷
      getNowQuestionnaire(){
        let QuesId = Number(this.$route.query.id)
        console.log(QuesId)

        request({
          url: '/question/questionnaireID',
          method: 'get',
          params: {
            id: QuesId
          }
        }).then(res=>{
          console.log(res);
          if (res.data.Message !== 'No Such Questionnaire'){
            // this.Questionnaire = res.data.Questionnaire
            this.adjustDataStruct(res.data.Questionnaire)
            console.log(this.Questionnaire)
          }
        }).catch(err=>{
          console.log(err)
        })
      },

      // // 刷新页面高度
      // updateHTMLHeight(height){
      //   let classify = this.$refs.AnalysisPage;
      //   let html = document.documentElement;
      //   let body = document.body;
      //   console.log(height)
      //   console.log(classify.offsetTop)
      //   html.style.height = height + classify.offsetTop + 'px';
      // },

    },

    created() {
      this.getNowQuestionnaire()
    },
    data(){
      return {
        isShowQuickNav: true,

        // 在问题列表中,对于单个问题需要展示的图表
        QuesDataShowTable: 0,


        // 需要展示的问题
        NeedShowQuestions: [],

        ops2: {
          vuescroll: {
            mode: 'native',
            sizeStrategy: 'percent',
            detectResize: true,
            /** 锁定一种滚动方向， 锁定的方向为水平或者垂直方向上滑动距离较大的那个方向 */
            locking: true,
          },
          scrollPanel: {},
          rail: {
            background: '#A9F5F2',
            opacity: 0,
            size: '6px',
            specifyBorderRadius: false,
            gutterOfEnds: null,
            gutterOfSide: '2px',
            keepShow: true
          },
          bar: {
            showDelay: 300,
            onlyShowBarOnScroll: true,
            keepShow: false,
            background: '#2ECCFA',
            opacity: .8,
            hoverStyle: false,
            specifyBorderRadius: false,
            minSize: false,
            size: '6px',
            disable: false,
          }
        },

        ops: {
          vuescroll: {
            mode: 'native',
            sizeStrategy: 'percent',
            detectResize: true,
            /** 锁定一种滚动方向， 锁定的方向为水平或者垂直方向上滑动距离较大的那个方向 */
            locking: true,
          },
          scrollPanel: {},
          rail: {
            background: '#A9F5F2',
            opacity: 0,
            size: '6px',
            specifyBorderRadius: false,
            gutterOfEnds: null,
            gutterOfSide: '2px',
            keepShow: true
          },
          bar: {
            showDelay: 300,
            onlyShowBarOnScroll: true,
            keepShow: false,
            background: '#2ECCFA',
            opacity: .8,
            hoverStyle: false,
            specifyBorderRadius: false,
            minSize: false,
            size: '6px',
            disable: false,
          }
        },

        //
        switchMode: 0,

        // 问卷列表
        QuestionnaireList: [],

        // 当前问卷
        Questionnaire: {

        },

        // 当前所在位置
        currentPos: 0,

        // 导航栏图标及按钮信息
        leftnavInfo: [
          {
            icon: '',
            title: '基本信息',
          },
          {
            icon: '',
            title: '数据统计',
          },
          {
            icon: '',
            title: '图表展示',
          },
        ],

        QuestionnaireData: {

        },
      }
    },
  }
</script>

<style scoped>
html,
body {
  background-color: #F2F2F2;
}


  .dataAnalysis {
    width: 100vw;
    position: relative;
    height: 100vh;
    background-color: #F2F2F2;
  }

  .dataAnalysis .topNav {
    width: 100%;
    height: 7%;
    position: fixed;
    background-color: white;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    z-index: 4;
    box-shadow: 0 0 5px rgba(0,0,0,.4);
    /*background-image: linear-gradient(to left,#3A01DF 10%, #CC2EFA);*/
  }

  .dataAnalysis .topNav .switchQuestionnaire {
    /*background-color: #58ACFA;*/
    border: 1px solid #58ACFA;
    border-radius: 4px;
    width: 10%;
    height: 50%;
    margin-left: 50px;
    cursor: pointer;
  }

  .dataAnalysis .topNav .analysisTab {
    /*background-color: pink;*/
    width: 20%;
    height: 100%;
    margin-left: 20%;
  }

  .dataAnalysis .topNav .analysisTab ul {
    /*background-color: red;*/
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  .dataAnalysis .topNav .analysisTab ul li {
    flex: 33%;
    height: 100%;
    /*background-color: blue;*/
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
  }

  .dataAnalysis .topNav .analysisTab ul .active {
    background-color: #2E9AFE;
    color: white;
  }

  .dataAnalysis .topNav .analysisTab ul li .icon {
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .dataAnalysis .topNav .analysisTab ul li .icon img {
    width: 100%;
    height: 100%;
  }

  .dataAnalysis .topNav .backHome {
    /*background-color: pink;*/
    border-radius: 15px ;
    border: 1px solid #58ACFA;
    width: 30px;
    position: absolute;
    right: 200px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .dataAnalysis .topNav .backHome .icon {
    width: 20px;
    height: 20px;
  }

  .dataAnalysis .topNav .backHome .icon img {
    width: 100%;
    height: 100%;
  }



  .dataAnalysis .topNav .personInfo {
    /*background-color: red;*/
    position: absolute;
    right: 50px;
    width: 80px;
    height: 50%;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
  }

  .dataAnalysis .topNav .personInfo .icon {
    width: 20px;
    height: 20px;
    border-radius: 10px;
    /*background-color: black;*/
    /*background-color: pink;*/
    margin-right: 10px;

    border: 1px solid rgba(88,211,247,.7);
    overflow: hidden;
  }

  .dataAnalysis .topNav .personInfo .icon img {
    width: 100%;
    height: 100%;
  }

  .dataAndAnalysis {
    width: 100vw;
    height: 100vh;

  }

  .dataAndAnalysis .AnalysisPage {
    background-color: white;
    width: 60vw;
    height: 85vh;
    position: absolute;
    left: 22%;
    top: 10vh;
  }


  .dataAndAnalysis .AnalysisPage .QuestionsIndexAnalysis {
    /*background-color: #42b983;*/
    width: 100%;
    height: 100%;
    position: relative;
  }

/*.dataAndAnalysis .AnalysisPage .AnswerTable {*/
/*  width: 100%;*/
/*  height: 100%;*/
/*  background-color: #42b983;*/
/*}*/

  .dataAndAnalysis .AnalysisPage .QuestionsIndexAnalysis  .quickNav {
    background-color: white;
    box-shadow: 0 0 5px rgba(0,0,0,.5);
    /*border-radius: 999999px;*/
    width: 3vw;
    height: 25vh;
    position: absolute;
    top: 0;
    right: -5vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

.dataAndAnalysis .AnalysisPage .QuestionsIndexAnalysis .quickNav div {
  height: 7vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /*background-color: pink;*/
  font-weight: 600;
  cursor: pointer;
  transition: .2s all ease-in-out;
}

.dataAndAnalysis .AnalysisPage .QuestionsIndexAnalysis .quickNav div:hover {
  background-color: #58ACFA;
  color: white;
}

.dataAndAnalysis .AnalysisPage .QuestionsIndexAnalysis .quickNav div i {
  width: 100%;
  height: 100%;
  margin: 2px 0;
}

  .dataAndAnalysis .AnalysisPage .QuestionsIndexAnalysis .normalReport {
    width: 100%;
    height: 75vh;
    /*background-color: #58ACFA;*/
    padding: 10px;

  }

  .dataAndAnalysis .AnalysisPage .QuestionsIndexAnalysis .normalReport .DataReportTitle {
    font-family: 'STKaiti',Serif;
    text-align: left;
    font-weight: 600;
  }

    .dataAndAnalysis  .QuestionsIndex{
      position: absolute;
      left: 3vw;
      top: 10vh;
      background-color: white;
      width: 250px;
      box-shadow: 0 0 5px rgba(2,2,2,.2);
      height: 80vh;

    }

  .dataAndAnalysis  .QuestionsIndex .ModesData{
    /*background-color: #42b983;*/
    width: 90%;
    height: 70%;
    margin: 0 auto;

  }

.dataAndAnalysis  .QuestionsIndex .ModesData .QuesModeData {
  width: 100%;
  height: 100%;
}

  .dataAndAnalysis  .QuestionsIndex .ModesData .QuesModeData ul {
    width: 100%;
    height: 95%;
  }
  .dataAndAnalysis  .QuestionsIndex .ModesData .QuesModeData ul .head {
    font-weight: 600;
    font-size: 18px;
    margin-left: 15px;
  }

.dataAndAnalysis  .QuestionsIndex .ModesData .QuesModeData ul .head:hover {
  background-color: transparent;
}

.dataAndAnalysis  .QuestionsIndex .ModesData .QuesModeData ul li {
    width: 80%;
    height: 30px;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: 20px;
    text-align: left;
    line-height: 30px;
    padding-left: 5px ;
    cursor: pointer;
    transition: .4s all ease-in-out;
  }

.dataAndAnalysis  .QuestionsIndex .ModesData .QuesModeData ul li:hover {
  background-color: rgba(216,216,216,.5);
}

  .dataAndAnalysis  .QuestionsIndex .switchIndex {
    /*background-color: #58ACFA;*/
    /*margin-top: 5%;*/
    width: 80%;
    height: 5%;
    margin: 5% auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    /*border-radius: 9999px;*/
    position: relative;
  }

  .dataAndAnalysis  .QuestionsIndex .switchIndex div {
    font-size: 16px;
    color: #A4A4A4;
    transition: .4s all ease-in-out;
    cursor: pointer;
  }

  .dataAndAnalysis  .QuestionsIndex .switchIndex .activeData {
    transform: scale(1.05);
    color: rgba(64,0,255,.6);
    font-weight: 600;
  }

  .AnswerTable {
    width: 100vw;
    height: 100vh;
    padding-top: 5%;
    /*display: flex;*/
    position: relative;
    /*justify-content: center;*/
    /*align-items: center;*/
    /*background-color: white;*/
  }
.AnswerTable .AnswerNav {
  width: 15vw;
  height: 50vh;
  background-color: white;
  position: absolute;
  left: 5vw;
  box-shadow: 0 0 5px rgba(0,0,0,.5);
}

.AnswerTable .Answers {
  width: 50%;
  height: 70%;
  background-color: #42b983;
  margin-left: 45vh;
  /*margin-top: 30%;*/
}




</style>