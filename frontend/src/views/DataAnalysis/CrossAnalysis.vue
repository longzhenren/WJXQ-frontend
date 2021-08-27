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

    </div>
  </div>
</template>

<script>
export default {
  name: "CrossAnalysis",
  props: {
    Questions: {
      type: Array,
      default(){
        return [];
      }
    },
  },
  data(){
    return {
      // 是否显示交叉分析组件
      isShowCross: false,

      // Questions: [],

      // 指定为x自变量的题目
      xVairableQues: {
        Stem: '添加自变量'
      },

      // 指定为y因变量的题目
      yVairableQues: {
        Stem: '添加因变量'
      },
    }
  },
  methods: {
    // 进行交叉分析
    goCrossAnalysis(){
      this.isShowCross = true
      console.log(this.xVairableQues);
      console.log(this.yVairableQues)
    }
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
    height: 10vh;
    background-color: #42b983;
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