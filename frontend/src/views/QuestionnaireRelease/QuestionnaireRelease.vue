<template>
  <div class="questionnaireRelease">
<!--    侧边菜单-->
    <div class="releaseMenu">
      <ul class="menuItems">
        <li class="menuItem" @click="backToDesign">
          <span></span>
          <div>返回设计页面</div>
        </li>

        <li class="menuItem"
            :class="{horzontalActive: leftMenuCurrent===0}"
            @click="changeLeft(0)">
          <span></span>
          <div>问卷发布</div>
        </li>

        <li class="menuItem"
            :class="{horzontalActive: leftMenuCurrent===1}"
            @click="changeLeft(1)">
          <span></span>
          <div>问卷发送</div>
        </li>

<!--        <li class="menuItem">-->

<!--        </li>-->
      </ul>
    </div>

<!--    顶部导航栏-->
    <div class="topNav">
      <ul v-if="leftMenuCurrent===0">
        <!--      问卷状态-->
        <li v-for="(item,index) in releaseTopNavData"
            :class="{ active: topNavCurrent===index}"
            @click="changeTop(index)" >
          <span>{{ item.icon }}</span>
          <div>{{ item.title }}</div>
        </li>
      </ul>

      <ul v-else-if="leftMenuCurrent===1">
        <li v-for="(item,index) in sendTopNavData"
            :class="{ active: topNavCurrent===index}"
            @click="changeTop(index)" >
          <span>{{ item.icon }}</span>
          <div>{{ item.title }}</div>
        </li>
      </ul>

      <div class="quesTitle">
        {{DesignedQuestionnaire.Text}}
      </div>
    </div>


    <div class="release" v-if="leftMenuCurrent===0">
      <div class="status" v-if="topNavCurrent===0">
        <div class="releasable" v-if="DesignedQuestionnaire.isReleaseable">
          此问卷已经设计完成,您可以开始
          <button>开启问卷</button>
        </div>

        <div class="disreleasable" v-else>
          此问卷还未设计完成,如果准备就绪,您可以
          <button @click="releaseMyQues">发布问卷</button>
        </div>


        <div class="check">
<!--          查看历史记录-->
          <div class="checkHistory">
            <span>发布记录</span>
            <span>可以查看问卷的发布历史记录</span>
          </div>

<!--          导出-->
          <div class="export">
            <span>导出到word</span>
            <span>可以将编辑好的问卷导出word</span>
          </div>
        </div>
      </div>

      <div class="settings" v-if="topNavCurrent===2">
        <div class="baseSetting">

        </div>

        <div class="ansTimesSetting">

        </div>

        <div class="submitSetting">

        </div>


      </div>
    </div>
  </div>
</template>

<script>
import bus from "../../assets/utils/bus";
import {request} from "../../network/request";

export default {
  name: "QuestionnaireRelease",
  data(){
    return{
      // 得到的问卷
        DesignedQuestionnaire: {},

      // 顶部菜单计数器
      topNavCurrent: 0,

      // 侧边菜单计数器
      leftMenuCurrent: 0,

      releaseTopNavData: [
        {
          icon: '',
          title: '问卷状态',
        },
        {
          icon: '',
          title: '问卷预览',
        },
        {
          icon: '',
          title: '问卷设置',
        }
      ],


      sendTopNavData: [
        {
          icon: '',
          title: '问卷链接',
        },
        {
          icon: '',
          title: '问卷预览',
        },
      ]

    }
  },
  methods: {
    // 发布问卷
    releaseMyQues(){
      this.DesignedQuestionnaire.isReleaseable = true
    },

    // 切换顶部导航栏
    changeTop(index){
      this.topNavCurrent=index
    },

    // 切换侧边导航栏
    changeLeft(index){
      this.leftMenuCurrent=index
    },



    // 返回问卷设计页面
    backToDesign(){
      this.$router.push('/design');
    },


    acceptDesignedQuestionnaire(Questionnaire){
      this.DesignedQuestionnaire = Questionnaire
      console.log(this.DesignedQuestionnaire)
    },
  },
  beforeDestroy() {
    bus.$emit('backToDesign',this.DesignedQuestionnaire)
  },
  created() {
    bus.$on('NewQuesDesigned',this.acceptDesignedQuestionnaire)
  },

}
</script>

<style scoped>
  .questionnaireRelease {
    width: 100vw;
    height: 100vh;
    background-color: #F2F2F2;
  }
  .releaseMenu {
    width: 8%;
    height: 100%;
    background-color: #08298A;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
  }

  .releaseMenu .menuItems {
    width: 100%;
  }


  .releaseMenu .menuItems .menuItem {
    height: 13vh;
    /*background-color: pink;*/
    width: 100%;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #BDBDBD;
    margin-bottom: 20px;
  }

  .releaseMenu .menuItems .menuItem:hover {
    cursor: pointer;
  }

  .releaseMenu .menuItems .menuItem span {
    font-size: 40px;
    margin-bottom: 10px;
  }


  .topNav {
    width: 100%;
    height: 13%;
    position: fixed;
    background-color: white;
    box-shadow: 0 0 10px rgba(0,0,0,.5);
    top: 0;
    left: 0;
    z-index: 4;
  }

  .topNav .quesTitle {
    width: 10%;
    height: 100%;
    /*line-height: 13vh;*/
    position: absolute;
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    color: #848484;
    right: 10%;
    bottom: 0;
  }

  .topNav ul {
    width: 30%;
    height: 100%;
    /*background-color: pink;*/
    margin-left: 250px;
    display: flex;
    justify-content: space-around;
  }

  .topNav ul li {
    height: 100%;
    width: 33%;
    /*background-color: white;*/
    /*color: #848484;*/
    font-weight: 600;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }

  .topNav ul li:hover {
    cursor: pointer;
  }

  .topNav ul li span {
    font-size: 40px;
    margin-bottom: 10px;
  }



   .active {
    background-color: #58ACFA;
    color: white;
  }


   .horzontalActive {
     background-color: #088A08;
     color: #D8D8D8;
   }

   .release {
     background-color: white;
     width: 50%;
     height: 80%;
     position: absolute;
     left: 50%;
     top: 16%;
     transform: translateX(-50%);
   }
  .release>div {
    width: 100%;
    height: 100%;
  }


  .release .status {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

  }

  .release .status div {
    background-color: white;
    width: 100%;
    height: 15%;
    display: flex;
    box-sizing: border-box;
    justify-content: start;
    padding-left: 10% ;
    align-items: center;
    box-shadow: 0 0 6px rgba(2,2,2,.5);
  }
  .release .status div button {
    border: 0;
    outline: none;
    background-color: #FE9A2E;
    color: #F2F2F2;
    height: 30%;
    width: 80px;
    margin-left: 10px;
    transition: all .4s ease-in-out;
  }

  .release .status div button:hover {
    cursor: pointer;
    background-color: #FFBF00;
  }
  .release .status .check {
    background-color: white;
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 30px 0;
  }

  .release .status .check div {
    box-shadow: none;
    /*background-color: pink;*/
    display: flex;
    height: 70px;
    flex-direction: column;
    justify-content: space-around;
    align-items: start;
  }

  .release .settings {

  }

  .release .status .check div span:first-child {
    color: #58ACFA;
  }

  .release .status .check div span:first-child:hover {
    cursor: pointer;
  }

</style>

