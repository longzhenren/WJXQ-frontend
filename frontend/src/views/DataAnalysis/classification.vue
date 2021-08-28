<template>
  <div class="classification">
    <el-collapse @change="handleChange()">
      <el-collapse-item name="1">
        <template slot="title">
          <div class="classificationTitle">
            <i class="el-icon-orange"></i>
            <span>分类条件</span>
          </div>
        </template>
<!--        <el-divider></el-divider>-->
        <div class="classificationCondition">
          <el-form :model="queryForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
            <el-form-item v-for="(qKey, index) in queryForm.queryKeys"
                :label="'条件' + (index+1) "
                :key="qKey.key">
              <el-select v-model="qKey.type" placeholder="请选择查询类别" style="width: 150px">
                <el-option label="标题" value="标题"></el-option>
                <el-option label="题目种类" value="题目种类"></el-option>
              </el-select>
              <el-input v-model="qKey.value" v-if="qKey.type==='标题'" size="middle" style="width: 223px"></el-input>
              <el-select v-model="qKey.value" placeholder="请选择查询类别" v-if="qKey.type==='题目种类'">
                <el-option label="单选" value="1"></el-option>
                <el-option label="多选" value="2"></el-option>
                <el-option label="填空" value="3"></el-option>
                <el-option label="评价" value="4"></el-option>
              </el-select>
              <el-button @click.prevent="removeDomain(qKey)">删除</el-button>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm">确认查询</el-button>
              <el-button @click="addDomain">添加条件</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>

      <div class="queryDataAnalysis" ref="analysisData">
        <vue-scroll
        :op="ops3"
        ref="vss">
          <DataAnalysisList v-if="this.QuestionnaireQues.length!==0"
                            :questions="QuestionnaireQues">
          </DataAnalysisList>

          <div class="donotFind" v-else>
          无结果
          </div>

          <el-divider></el-divider>
        </vue-scroll>




      </div>


    </el-collapse>
<!--    <div class="classificationTitle">-->
<!--      <i class="el-icon-orange"></i>-->
<!--      <span>分类条件</span>-->
<!--    </div>-->


  </div>
</template>

<script>
import DataAnalysisList from "./DataAnalysisList";

export default {
  name: "classification",
  props: {
    Questions: Array,
  },
  components: {
    DataAnalysisList
  },
  data(){
    return {
      ops3: {
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

      // 是否开始查询
      isStartQuery: false,

      // 查询条件表单
      queryForm: {
        queryKeys: [
          {
            type: '标题',
            value: '',
            key: Date.now()
          },
        ],
      },

      // 获取的问卷题目信息
      QuestionnaireQues: []
    }
  },
  updated() {
    // this.getNewClassfyHeight();
  },
  mounted() {
  },
  methods: {

    handleChange(){
      let analysisData = this.$refs.analysisData;
      // console.log(analysisData.classList)
      if (!analysisData.classList.contains('queryDataAnalysisHavePad')) {
        analysisData.classList.add('queryDataAnalysisHavePad')
      }
      else {
        analysisData.classList.remove('queryDataAnalysisHavePad')
      }

    },

    // // 刷新页面高度
    // getNewClassfyHeight(){
    //   let analysisData = document.querySelector(".classification");
    //
    //   // let element = document.querySelectorAll(".classification");
    //   console.log(analysisData.offsetTop)
    //   // console.log(element.clientHeight)
    //   console.log(analysisData.clientHeight)
    //   let height = analysisData.offsetTop+analysisData.clientHeight;
    //   this.$emit('sendHeight',height);
    //   // console.log(analysisData.offsetTop + analysisData.offsetHeight + 'vh');
    // },

    // 确认查询
    submitForm(){
      // console.log(this.queryForm)
      this.isStartQuery = true;
      // console.log(this.isStartQuery)
      this.getQueryTabs();
    },


    // 获取查询结果
    getQueryTabs(){
      console.log('aaaa')
      // this.Questions = [];
      let queryKeys = this.queryForm.queryKeys;
      let questions = this.Questions;
      this.QuestionnaireQues = [];
      for (let i = 0; i < questions.length; i++) {
        let queryNum = 0;
        let question = questions[i];
        // console.log(question)
        for (let j = 0; j < queryKeys.length; j++) {
          let queryKey = queryKeys[j];
          if (queryKey.type==='标题' && queryKey.value === question.Stem ){
            queryNum+=1;
            // console.log('标题满足')
          }
          else if (queryKey.type==='题目种类' && Number(queryKey.value) === question.Type ){
            queryNum++;
            // console.log(question)
            // console.log(Number(queryKey.value))
          }
        }
        console.log('查询条件满足数',queryNum)
        if (queryNum === queryKeys.length) {
          this.QuestionnaireQues.push(question);
        }
      }

      // console.log(this.QuestionnaireQues)
    },

    addDomain() {
      this.queryForm.queryKeys.push({
        value: '',
        key: Date.now(),
        type: '标题',
      });
    },
    removeDomain(item) {
      var index = this.queryForm.queryKeys.indexOf(item)
      if (this.queryForm.queryKeys.length === 1){
          this.$message({
            showClose: true,
            message: '已是最后一个条件',
            type: 'warning'
          });
          return;
      }
      if (index !== -1) {
        this.queryForm.queryKeys.splice(index, 1)
      }
    },
  }
}
</script>

<style scoped>
  html, body {

  }

  .classification {
    width: 100%;
    height: 75vh;
    /*background-color: #E6E6E6;*/
  }

  .classification .queryDataAnalysis {
    height: 75vh;
    /*padding-bottom: 200px;*/
    /*background-color: #E6E6E6;*/
    width: 100%;
    transition: .4s all ease-in-out;
    /*box-shadow: 0 0 10px rgba(0,0,0,.4);*/
  }

  .classification .queryDataAnalysisHavePad {
    padding-bottom: 200px;
  }

  /*.classification .queryDataAnalysis:hover {*/
  /*  background-color: rgba(242,242,242,.7);*/
  /*}*/

  .classification .queryDataAnalysis .donotFind {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 24px;
    letter-spacing: 5px;
    height: 30vh;
    background-color: rgba(242,242,242,.2);
    /*box-shadow: 0 0 10px rgba(2,2,2,.6);*/
  }

  /*.classification .queryDataAnalysis .donotFind:hover {*/
  /*  background-color: rgba(242,242,242,.2);*/
  /*}*/

  .classification .classificationTitle {
    /*background-color: pink;*/
    height: 5vh;
    font-family: 'STKaiti',Serif;
    /*text-align: left;*/
    font-weight: 600;
    line-height: 5vh;
    padding-left: 10px;
    margin: 5px 0;
    text-align: left;
    border-bottom: 1px solid rgba(0,0,0,.5);
  }


  .classificationCondition {
    /*background-color: pink;*/
    width: 100%;

    /*height: 20vh;*/
  }
</style>