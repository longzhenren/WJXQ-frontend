<template>
  <div class="dataAnalysis">
    <nav class="leftNav">
      <ul>
        <li v-for="(item,index) in leftnavInfo"
            :class="{active: currentPos===index}"
            @click="changePos(index)">
          <span>{{item.icon}}</span>
          <div>{{item.title}}</div>
        </li>
      </ul>
    </nav>

    <nav class="topNav">
<!--      问卷信息-->
      <div class="info">

      </div>


<!--      操作-->
      <div class="operations">

      </div>
    </nav>




<!--    问卷基本信息-->
    <div class="QuesBase">

    </div>


<!--    答卷数据信息统计-->
    <div class="QuesTime"></div>


<!--    图表统计数据-->
    <div class="ChartsData"></div>
  </div>
</template>

<script>
  export default {
    name: "DataAnalysis",
    methods:{
      // 切换顶部导航栏
      changePos(index){
        this.currentPos = index
      }
    },
    data(){
      return {
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
  .dataAnalysis {
    width: 100vw;
    position: relative;
    height: 100vh;
    background-color: white;
  }

  .dataAnalysis .leftNav {
    /*background-color: pink;*/
    width: 7%;
    height: 100%;
    box-shadow: 0 0 10px rgba(0,0,0,.4);
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    justify-content: start;
    z-index: 5;
    align-items: start;
  }

  .dataAnalysis .leftNav ul {
    /*background-color: pink;*/
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  .dataAnalysis .leftNav ul li {
    height: 20%;
    /*background-color: #58ACFA;*/
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: .4s;
    border-right: 5px solid transparent;
  }

  .dataAnalysis .leftNav ul li:hover {
    cursor: pointer;
    transform: scale(1.05);
  }

  .dataAnalysis .leftNav ul li span {
    font-size: 30px;
    font-weight: 600;
  }

  .dataAnalysis .leftNav ul li div {
    font-size: 16px;
    font-weight: 600;
  }

  .dataAnalysis .leftNav ul .active {
    /*background-color: #FE9A2E;*/
    border-right: 5px solid rgba(254,154,46,.7);
  }

  .dataAnalysis .topNav {
    width: 93%;
    height: 10%;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 4;
    box-shadow: 0 0 10px rgba(0,0,0,.4);
    background-image: linear-gradient(to left,#3A01DF 10%, #CC2EFA);
  }
</style>